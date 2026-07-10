#!/usr/bin/env node
/**
 * aiwiki-mcp：把 AiWiki 百科（AI 编码误区 + LLM 隐私保护）暴露为 MCP 工具。
 *
 * 数据来自站点公开索引 https://xuebinma.github.io/AIWiki/api/index.json，
 * 条目全文按需从 GitHub raw 拉取——包本身不内置内容，站点更新即生效。
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { createLoader } from './lib/loader.js';
import { searchEntries } from './lib/search.js';

const loader = createLoader();

const server = new McpServer({
  name: 'aiwiki',
  version: '0.1.0',
});

function formatResult(entry, lang) {
  const en = lang === 'en';
  return {
    id: entry.id,
    subject: entry.subject,
    title: en && entry.title_en ? entry.title_en : entry.title,
    summary: en && entry.summary_en ? entry.summary_en : entry.summary,
    severity: entry.severity || undefined,
    phase: entry.phase || undefined,
    url: en ? entry.url_en : entry.url,
  };
}

server.registerTool(
  'aiwiki_search',
  {
    title: 'Search AiWiki',
    description:
      'Search AiWiki — an encyclopedia of AI-coding pitfalls and LLM privacy protection, written from the AI\'s first-person perspective. ' +
      'Use when the user hits a recurring AI-coding failure (context issues, hallucinated APIs, tests being gamed, destructive commands, prompt injection…) ' +
      'or an LLM privacy question (training data extraction, membership inference, RAG leakage…). Queries can be Chinese or English.',
    inputSchema: {
      query: z.string().describe('Keywords or a short description of the problem (中文或英文)'),
      subject: z
        .enum(['coding-pitfalls', 'privacy'])
        .optional()
        .describe('Restrict to one subject; omit to search both'),
      lang: z.enum(['zh', 'en']).optional().describe('Language of returned titles/summaries/urls (default zh)'),
      limit: z.number().int().min(1).max(20).optional().describe('Max results (default 5)'),
    },
  },
  async ({ query, subject, lang = 'zh', limit }) => {
    try {
      const index = await loader.getIndex();
      const results = searchEntries(index.entries, query, { subject, limit });
      if (results.length === 0) {
        return {
          content: [{ type: 'text', text: `No entries matched "${query}". Try broader or different keywords.` }],
        };
      }
      const payload = results.map((e) => formatResult(e, lang));
      return {
        content: [
          {
            type: 'text',
            text:
              `${results.length} result(s). Use aiwiki_get_entry with an id for the full entry.\n\n` +
              JSON.stringify(payload, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [{ type: 'text', text: `aiwiki_search failed: ${error.message}` }],
      };
    }
  },
);

server.registerTool(
  'aiwiki_get_entry',
  {
    title: 'Get AiWiki entry',
    description:
      'Fetch the full markdown of one AiWiki entry by id (as returned by aiwiki_search). ' +
      'Entries include mechanism analysis, consequences, best practices, and verifiable sources.',
    inputSchema: {
      id: z.string().describe('Entry id, e.g. "context-rot"'),
      lang: z.enum(['zh', 'en']).optional().describe('Content language (default zh; falls back to zh if en missing)'),
    },
  },
  async ({ id, lang = 'zh' }) => {
    try {
      const index = await loader.getIndex();
      const entry = index.entries.find((e) => e.id === id);
      if (!entry) {
        return {
          isError: true,
          content: [{ type: 'text', text: `No entry with id "${id}". Use aiwiki_search to find valid ids.` }],
        };
      }
      const content = await loader.getEntryContent(entry, lang);
      const url = lang === 'en' ? entry.url_en : entry.url;
      return {
        content: [{ type: 'text', text: `Canonical URL: ${url}\n\n${content}` }],
      };
    } catch (error) {
      return {
        isError: true,
        content: [{ type: 'text', text: `aiwiki_get_entry failed: ${error.message}` }],
      };
    }
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
