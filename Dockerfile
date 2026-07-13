# 供 MCP 目录平台（Glama 等）自动检测 aiwiki-mcp 服务器用：
# 构建后容器以 stdio 模式启动 MCP server，可响应 initialize / tools/list 自省。
# 与站点构建无关；本地开发不需要它。
FROM node:22-alpine
RUN npm install -g aiwiki-mcp
ENTRYPOINT ["aiwiki-mcp"]
