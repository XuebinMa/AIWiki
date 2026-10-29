# 隐私旧文逐篇复核 · 2026-10-29

范围：manifest 中 36 对既有文章。中文正文逐篇阅读，并对照英文修改处；一手依据通过网页实际打开核验。复核区分研究设置、产品配置、形式保证与经验测试；未重新证明密码协议，也未运行论文全套实验。日期只标记下列明确范围，不能解读为所有产品或法律段落均获得最新认证。

## he-mpc

- 中文：`privacy/01-foundations/he-mpc.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/01-foundations/he-mpc.mdx`。
- 判定与修订：收紧“无任何硬件信任”、MPC 无人见完整输入及功能测试即证明安全的说法；区分 HE 机密性与恶意服务器计算正确性。历史性能未有统一同条件基准，保留定性限制。
- 下次复核：2027-04-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://research.ibm.com/publications/fully-homomorphic-encryption-using-ideal-lattices](https://research.ibm.com/publications/fully-homomorphic-encryption-using-ideal-lattices)；[https://github.com/evansuva/pragmaticmpc](https://github.com/evansuva/pragmaticmpc)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未重新证明具体协议；书籍 PDF 直链超时，由作者仓库核出处；无同条件 LLM 性能倍数。

## membership-inference

- 中文：`privacy/01-foundations/membership-inference.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/01-foundations/membership-inference.mdx`。
- 判定与修订：纠正“不需要原文”和其他隐私攻击必经地基的表述；将随机基线式验收改为带置信区间、样本量、基率及攻击覆盖范围的经验闸门。
- 下次复核：2027-04-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://arxiv.org/abs/1610.05820](https://arxiv.org/abs/1610.05820)；[https://arxiv.org/abs/2112.03570](https://arxiv.org/abs/2112.03570)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未跑新的 MIA 实验；测试覆盖、低 FPR 置信区间和真实基率由使用者另核。

## model-extraction-stealing

- 中文：`privacy/01-foundations/model-extraction-stealing.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/01-foundations/model-extraction-stealing.mdx`。
- 判定与修订：去除开放任意 API 就必能抽取及替身必放大训练数据泄露的推论；明确 2024 参数抽取的接口条件，验收不用未知攻击者经济价值替代实测。
- 下次复核：2027-01-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://arxiv.org/abs/1609.02943](https://arxiv.org/abs/1609.02943)；[https://arxiv.org/html/2403.06634v2](https://arxiv.org/html/2403.06634v2)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：接口能力和价格是历史研究设置；当前接口及替身隐私转移未实测。

## model-inversion-attribute-inference

- 中文：`privacy/01-foundations/model-inversion-attribute-inference.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/01-foundations/model-inversion-attribute-inference.mdx`。
- 判定与修订：删除无依据“一半”比例；明确类别代表与原始样本不同、属性推断并不限训练成员。ACM 页面受限，实际阅读作者托管原文。
- 下次复核：2027-04-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://www.cs.toronto.edu/~ristenpart/papers/mi-ccs.pdf](https://www.cs.toronto.edu/~ristenpart/papers/mi-ccs.pdf)；[https://www.usenix.org/conference/usenixsecurity14/technical-sessions/presentation/fredrikson_matthew](https://www.usenix.org/conference/usenixsecurity14/technical-sessions/presentation/fredrikson_matthew)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：作者 PDF 代替受限 ACM 页；未证明类别代表属于特定原训练记录。

## property-inference

- 中文：`privacy/01-foundations/property-inference.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/01-foundations/property-inference.mdx`。
- 判定与修订：实质纠错：原文把 n_leaked 风险方向与通过/失败条件写反；改正并换为原论文示例，说明等效信息量不等于实际泄露记录。增加黑盒/白盒相对强度与重采样的后续一手证据。
- 下次复核：2027-04-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://arxiv.org/html/2109.06024](https://arxiv.org/html/2109.06024)；[https://arxiv.org/abs/2212.07591](https://arxiv.org/abs/2212.07591)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：n_leaked 定义与例子已核；不外推全部分布、模型或黑白盒相对强弱。

## trusted-execution-environment

- 中文：`privacy/01-foundations/trusted-execution-environment.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/01-foundations/trusted-execution-environment.mdx`。
- 判定与修订：更新 Blackwell / Hopper 多 GPU 链路区别及租户软件仍可信的关键边界；去除未核对算法位数与通用性能范围、标准模型完全无需适配的过度简化。
- 下次复核：2026-12-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://docs.nvidia.com/confidential-computing/virtual-machines/threat-model](https://docs.nvidia.com/confidential-computing/virtual-machines/threat-model)；[https://developer.nvidia.com/blog/enabling-private-high-performance-production-ai-inference-with-nvidia-confidential-computing/](https://developer.nvidia.com/blog/enabling-private-high-performance-production-ai-inference-with-nvidia-confidential-computing/)；[https://www.usenix.org/conference/usenixsecurity18/presentation/bulck](https://www.usenix.org/conference/usenixsecurity18/presentation/bulck)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未检验实际平台固件/撤销状态或未知侧信道；Dev 威胁模型不认证全部发行版。

## context-surface-privacy

- 中文：`privacy/03-conversational-llms/context-surface-privacy.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/03-conversational-llms/context-surface-privacy.mdx`。
- 判定与修订：限定上下文可提取性，区分指令层级与保密访问控制、精确提取与相似重构；提示词不能作为唯一控制而非所有提示词控制无效。
- 下次复核：2027-01-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://arxiv.org/abs/2307.06865](https://arxiv.org/abs/2307.06865)；[https://arxiv.org/abs/2402.12959](https://arxiv.org/abs/2402.12959)；[https://genai.owasp.org/llmrisk/llm072025-system-prompt-leakage/](https://genai.owasp.org/llmrisk/llm072025-system-prompt-leakage/)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未认证所有攻击或防御的当前成功率；上下文存在不等于必然提取。

## dp-fine-tuning

- 中文：`privacy/03-conversational-llms/dp-fine-tuning.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/03-conversational-llms/dp-fine-tuning.mdx`。
- 判定与修订：修正概率不等式与 δ 失效概率误解；会计须同配置数值一致，纳入调参与额外发布，明确不覆盖底座既有泄露。
- 下次复核：2027-04-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://arxiv.org/abs/2110.05679](https://arxiv.org/abs/2110.05679)；[https://arxiv.org/abs/2110.06500](https://arxiv.org/abs/2110.06500)；[https://csrc.nist.gov/pubs/sp/800/226/final](https://csrc.nist.gov/pubs/sp/800/226/final)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未重算具体训练任务会计；定义、全部私有访问和发布组合须按部署复核。

## dp-in-context-learning

- 中文：`privacy/03-conversational-llms/dp-in-context-learning.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/03-conversational-llms/dp-in-context-learning.mdx`。
- 判定与修订：补上常漏掉的可信执行模型/聚合器边界、固定合成发布的后处理条件与在线重复查询组合；修正 δ 与会计验收。
- 下次复核：2027-04-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://arxiv.org/abs/2305.01639](https://arxiv.org/abs/2305.01639)；[https://arxiv.org/abs/2309.11765](https://arxiv.org/abs/2309.11765)；[https://csrc.nist.gov/pubs/sp/800/226/final](https://csrc.nist.gov/pubs/sp/800/226/final)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未复现算法；仅不再访问私有数据的固定 DP 输出后处理可复用，可信执行者视图另核。

## pii-regurgitation

- 中文：`privacy/03-conversational-llms/pii-regurgitation.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/03-conversational-llms/pii-regurgitation.mdx`。
- 判定与修订：更新 Presidio 社区移交及失效 FAQ，保留检测不完整的一手限制；审计用受控 canary/授权数据并区分格式命中与真实身份泄露。
- 下次复核：2026-12-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://raw.githubusercontent.com/data-privacy-stack/presidio/main/docs/faq.md](https://raw.githubusercontent.com/data-privacy-stack/presidio/main/docs/faq.md)；[https://docs.cloud.google.com/sensitive-data-protection/docs/concepts-infotypes](https://docs.cloud.google.com/sensitive-data-protection/docs/concepts-infotypes)；[https://docs.aws.amazon.com/comprehend/latest/dg/how-pii.html](https://docs.aws.amazon.com/comprehend/latest/dg/how-pii.html)；[https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/language-service/transparency-note-personally-identifiable-information](https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/language-service/transparency-note-personally-identifiable-information)；[https://arxiv.org/abs/2302.00539](https://arxiv.org/abs/2302.00539)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未测具体语言/实体漏检；Presidio 是社区项目而非微软当前官方服务。

## vlm-geolocation-inference

- 中文：`privacy/03-conversational-llms/vlm-geolocation-inference.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/03-conversational-llms/vlm-geolocation-inference.mdx`。
- 判定与修订：原论文明确绝对准确率有限，删除持续快速增强的外推；生产标签原仅以二手报道支撑，按本条一手研究口径降为研究；偏差研究发表状态更新。
- 下次复核：2027-01-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://petsymposium.org/popets/2025/popets-2025-0137.php](https://petsymposium.org/popets/2025/popets-2025-0137.php)；[https://arxiv.org/abs/2502.11163](https://arxiv.org/abs/2502.11163)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未测当前助手版本；研究绝对准确率有限，不能认证单图必可精确定位。

## confidential-inference

- 中文：`privacy/05-frontier-deployment/confidential-inference.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/05-frontier-deployment/confidential-inference.mdx`。
- 判定与修订：补 Blackwell 2026 GA 与 Confidential Space 尚分阶段状态；区分宿主运营商和可见明文的租户软件，PCC 透明日志不是所有机密推理必要架构。
- 下次复核：2026-12-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://security.apple.com/blog/private-cloud-compute/](https://security.apple.com/blog/private-cloud-compute/)；[https://docs.nvidia.com/confidential-computing/virtual-machines/threat-model](https://docs.nvidia.com/confidential-computing/virtual-machines/threat-model)；[https://cloud.google.com/blog/topics/ai-infrastructure/confidential-g4-gpus-are-ga/](https://cloud.google.com/blog/topics/ai-infrastructure/confidential-g4-gpus-are-ga/)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未跑实际证明链/性能测试；Google 具体 GA/后续支持时间不外推全部产品。

## dp-federated-learning

- 中文：`privacy/05-frontier-deployment/dp-federated-learning.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/05-frontier-deployment/dp-federated-learning.mdx`。
- 判定与修订：实质纠正 Gboard 仅 2 模型另启安全聚合；区分 DP-FTRL 算法与会计、ρ-zCDP 口径、设备级/用户级、Apple 事件级本地 DP。
- 下次复核：2027-01-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://arxiv.org/abs/2305.18465](https://arxiv.org/abs/2305.18465)；[https://machinelearning.apple.com/research/learning-with-privacy-at-scale](https://machinelearning.apple.com/research/learning-with-privacy-at-scale)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：历史生产配置不代表全部 2026 产品；客户端/设备/个人映射及组合须按部署核。

## federated-analytics

- 中文：`privacy/05-frontier-deployment/federated-analytics.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/05-frontier-deployment/federated-analytics.mdx`。
- 判定与修订：稳定机制保留；避免将特定采样阈值算法外推任意 heavy-hitters、经验反演失败外推密码学证明，明确本地/中心 DP 路线区别。
- 下次复核：2027-04-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://research.google/blog/federated-analytics-collaborative-data-science-without-data-collection/](https://research.google/blog/federated-analytics-collaborative-data-science-without-data-collection/)；[https://proceedings.mlr.press/v108/zhu20a.html](https://proceedings.mlr.press/v108/zhu20a.html)；[https://machinelearning.apple.com/research/learning-with-privacy-at-scale](https://machinelearning.apple.com/research/learning-with-privacy-at-scale)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：具名历史生产用例与特定算法保证分别成立；未核当前产品全部查询配置。

## gradient-leakage

- 中文：`privacy/05-frontier-deployment/gradient-leakage.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/05-frontier-deployment/gradient-leakage.mdx`。
- 判定与修订：收紧数学必可逆与收敛即原样本；验收区分有权原样本、攻击预算、属性/重建指标与独立形式保证。
- 下次复核：2027-04-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://arxiv.org/abs/1906.08935](https://arxiv.org/abs/1906.08935)；[https://arxiv.org/abs/2003.14053](https://arxiv.org/abs/2003.14053)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未复现重建或给出通用 batch 阈值；梯度匹配/收敛不是唯一原样本证明。

## secure-aggregation

- 中文：`privacy/05-frontier-deployment/secure-aggregation.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/05-frontier-deployment/secure-aggregation.mdx`。
- 判定与修订：修正错误书目（2016 workshop 被标成 CCS2017）；完整协议有特定主动安全模型，不一概排除。验收不把黑盒运行测试当密码学证明。
- 下次复核：2027-04-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://research.google/pubs/practical-secure-aggregation-for-privacy-preserving-machine-learning/](https://research.google/pubs/practical-secure-aggregation-for-privacy-preserving-machine-learning/)；[https://arxiv.org/abs/1902.01046](https://arxiv.org/abs/1902.01046)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未重新证明部署协议；合谋、掉线和允许输出假设须逐项匹配。

## machine-unlearning

- 中文：`privacy/05-frontier-deployment/machine-unlearning.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/05-frontier-deployment/machine-unlearning.mdx`。
- 判定与修订：纠正近似遗忘全部无保证及 SISA 等同任意重训的误解；攻击失败不证明分布等价，并以既有验证/基准文章承接而非新增重复条目。
- 下次复核：2027-01-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://arxiv.org/abs/1912.03817](https://arxiv.org/abs/1912.03817)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：仅核 SISA 原工作并对照既有验证条目；有限攻击未检出不证明分布等价。

## on-device-inference-privacy

- 中文：`privacy/05-frontier-deployment/on-device-inference-privacy.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/05-frontier-deployment/on-device-inference-privacy.mdx`。
- 判定与修订：机制稳定保留；将单次推理抓包无 prompt 过强验收改为跨后台/重连/延迟上传的受控测试，明确加密载荷与宿主 App 边界。
- 下次复核：2026-12-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://machinelearning.apple.com/research/introducing-third-generation-of-apple-foundation-models](https://machinelearning.apple.com/research/introducing-third-generation-of-apple-foundation-models)；[https://developer.android.com/ai/gemini-nano](https://developer.android.com/ai/gemini-nano)；[https://security.apple.com/blog/private-cloud-compute/](https://security.apple.com/blog/private-cloud-compute/)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未测试设备及宿主 App；加密流量、后台上传和网络回退须实际观测。

## lora-adapter-leakage

- 中文：`privacy/05-frontier-deployment/lora-adapter-leakage.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/05-frontier-deployment/lora-adapter-leakage.mdx`。
- 判定与修订：主要研究结论与预印本状态复核保留；限制 AUC 示例与 MIA/抽取跨目标外推，修正“未检出即通过”的证明含义。
- 下次复核：2027-01-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://arxiv.org/abs/2507.18302](https://arxiv.org/abs/2507.18302)；[https://arxiv.org/abs/2310.11397](https://arxiv.org/abs/2310.11397)；[https://arxiv.org/abs/2403.09562](https://arxiv.org/abs/2403.09562)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：LoRA-Leak 保留已核预印本状态；AUC 和防御效果限其设置，抽取另测。

## split-learning-leakage

- 中文：`privacy/05-frontier-deployment/split-learning-leakage.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/05-frontier-deployment/split-learning-leakage.mdx`。
- 判定与修订：明确 TEE 只执行被批准代码并不自动纠正恶意目标；标签完美恢复限定只隐藏输出层，MSE 不作通用安全线。
- 下次复核：2027-04-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://arxiv.org/abs/2108.09033](https://arxiv.org/abs/2108.09033)；[https://arxiv.org/abs/2012.02670](https://arxiv.org/abs/2012.02670)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未逐表复算 MSE，因此不保留未核范围作通用基准；标签结论限只隐藏输出层设计。

## data-lifecycle-deletion

- 中文：`privacy/06-governance-compliance/data-lifecycle-deletion.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/06-governance-compliance/data-lifecycle-deletion.mdx`。
- 判定与修订：去掉 GDPR 认可任意备份轮替延期的泛化，增加 beyond-use 和恢复后删除重放；EU 官方文本受限如实记录，NIST1.1 不误标最终版。
- 下次复核：2027-01-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://www.nist.gov/privacy-framework/new-projects/privacy-framework-version-11](https://www.nist.gov/privacy-framework/new-projects/privacy-framework-version-11)；[https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-erasure/](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-erasure/)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：EUR-Lex 官方入口遇访问挑战，未声称重新通读全部法条；英国 ICO 不能直接外推全部 EU 场景。

## inference-service-data-boundary

- 中文：`privacy/06-governance-compliance/inference-service-data-boundary.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/06-governance-compliance/inference-service-data-boundary.mdx`。
- 判定与修订：更新 OpenAI 当前 URL 与 ZDR/应用状态/缓存/MCP 边界，修正第三方调用即法律出境；表格验收纳入实际账户和功能配置。
- 下次复核：2026-11-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://developers.openai.com/api/docs/guides/your-data](https://developers.openai.com/api/docs/guides/your-data)；[https://platform.claude.com/docs/en/manage-claude/api-and-data-retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未查看实际账户资格、合同和功能开关；端点/能力/地区变化须提前复核。

## ftaas-privacy

- 中文：`privacy/06-governance-compliance/ftaas-privacy.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/06-governance-compliance/ftaas-privacy.mdx`。
- 判定与修订：纠正 Anthropic7 天旧泛化；将 Qi 安全实验迁到隐私拒答明确标为假设，删除没有顶会就不能纳入威胁模型的误导。
- 下次复核：2026-12-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://arxiv.org/abs/2310.03693](https://arxiv.org/abs/2310.03693)；[https://developers.openai.com/api/docs/guides/supervised-fine-tuning](https://developers.openai.com/api/docs/guides/supervised-fine-tuning)；[https://developers.openai.com/api/docs/guides/your-data](https://developers.openai.com/api/docs/guides/your-data)；[https://platform.claude.com/docs/en/manage-claude/api-and-data-retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention)；[https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/zero-data-retention](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/zero-data-retention)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未查看账户合同/数据流；安全微调实验不是隐私拒答被破的直接实证。

## synthetic-data-privacy

- 中文：`privacy/06-governance-compliance/synthetic-data-privacy.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/06-governance-compliance/synthetic-data-privacy.mdx`。
- 判定与修订：补最新已发表 ReconSyn 的端到端 DP 后处理破口；纠正 DP 不是自动法律匿名、不以经验 MIA 失败定义 DP。去未有当前来源的厂商默认/epsilon 推荐。
- 下次复核：2027-01-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://arxiv.org/abs/2312.05114](https://arxiv.org/abs/2312.05114)；[https://www.usenix.org/conference/usenixsecurity22/presentation/stadler](https://www.usenix.org/conference/usenixsecurity22/presentation/stadler)；[https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-sharing/anonymisation/introduction-to-anonymisation/](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-sharing/anonymisation/introduction-to-anonymisation/)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未复现生成器实验；DP 不自动构成法律匿名，真实数据后处理须纳入预算。

## llm-watermarking

- 中文：`privacy/06-governance-compliance/llm-watermarking.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/06-governance-compliance/llm-watermarking.mdx`。
- 判定与修订：实质纠正 ICLR2024 被反向概括成一次改写必抹除；区分统计水印和 copyright traps、密钥及 p 值含义；补 2026 厂商公告并标未来模型范围。
- 下次复核：2027-01-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://proceedings.mlr.press/v202/kirchenbauer23a.html](https://proceedings.mlr.press/v202/kirchenbauer23a.html)；[https://arxiv.org/abs/2306.04634](https://arxiv.org/abs/2306.04634)；[https://proceedings.mlr.press/v235/meeus24a.html](https://proceedings.mlr.press/v235/meeus24a.html)；[https://www.anthropic.com/news/claude-text-watermark](https://www.anthropic.com/news/claude-text-watermark)；[https://deepmind.google/models/synthid/](https://deepmind.google/models/synthid/)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未实测厂商密钥/检测器；2026 公告区分未来模型和既有部署，p 值不是来源后验概率。

## persistent-agent-memory-privacy

- 中文：`privacy/06-governance-compliance/persistent-agent-memory-privacy.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/06-governance-compliance/persistent-agent-memory-privacy.mdx`。
- 判定与修订：当前 Memory 文档更新 7 天前，纠正全部历史必引用、默认哲学与 Temporary Chat 不读不写；增加 Library/connected-app 来源、summary 非穷尽、按源删除及 26Sep2025 法律状态。
- 下次复核：2026-11-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://help.openai.com/en/articles/8590148-memory-in-chatgpt](https://help.openai.com/en/articles/8590148-memory-in-chatgpt)；[https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool)；[https://openai.com/index/response-to-nyt-data-demands/](https://openai.com/index/response-to-nyt-data-demands/)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未检查用户账户；NYT 段仅引用厂商历史 output-log 声明，未核当前法院卷宗或泛化全部 memory 对象。
- 补充实际打开依据：[Temporary Chat in ChatGPT](https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt)：Personalized/Unpersonalized 均不 create/update，保存转 regular、按账户设置处理，最多 30 天安全留存和第三方 Actions 政策分别列明。

## dp-privacy-auditing

- 中文：`privacy/02-memorization-extraction/dp-privacy-auditing.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/02-memorization-extraction/dp-privacy-auditing.mdx`。
- 判定与修订：实质纠错：白盒ε8/下界 1.8 设置拼错；区分独立纳入与依赖隐私损失、统计下界与确定保证；低下界不单独指向实现 bug。
- 下次复核：2027-04-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://arxiv.org/html/2305.08846](https://arxiv.org/html/2305.08846)；[https://arxiv.org/abs/2006.07709](https://arxiv.org/abs/2006.07709)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未复现训练；数字限可注入任意梯度的白盒实验，最终选优需置信/多重检验校准。

## quantifying-memorization

- 中文：`privacy/02-memorization-extraction/quantifying-memorization.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/02-memorization-extraction/quantifying-memorization.mdx`。
- 判定与修订：补 exposure 精确定义与排名估计不确定性；不把 canary 低分当所有隐私安全，也不把跨模型族实证趋势改成定律。
- 下次复核：2027-04-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://arxiv.org/abs/1802.08232](https://arxiv.org/abs/1802.08232)；[https://arxiv.org/abs/2202.07646](https://arxiv.org/abs/2202.07646)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未运行 canary 实验；exposure 依候选空间、模板和排名估计，不测全部真实 PII 存储量。

## training-data-deduplication

- 中文：`privacy/02-memorization-extraction/training-data-deduplication.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/02-memorization-extraction/training-data-deduplication.mdx`。
- 判定与修订：纠正去重即每序列只强化一次；保留已核 10 次/1000 倍和约 10 倍降幅的论文条件，补全数据依赖去重与 DP 邻接分析。
- 下次复核：2027-04-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://aclanthology.org/2022.acl-long.577/](https://aclanthology.org/2022.acl-long.577/)；[https://proceedings.mlr.press/v162/kandpal22a.html](https://proceedings.mlr.press/v162/kandpal22a.html)；[https://arxiv.org/abs/2306.01116](https://arxiv.org/abs/2306.01116)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未重跑去重；历史降幅不能外推多轮/重采样或全部数据依赖预处理。

## multimodal-training-image-extraction

- 中文：`privacy/02-memorization-extraction/multimodal-training-image-extraction.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/02-memorization-extraction/multimodal-training-image-extraction.mdx`。
- 判定与修订：标题与正文区分图像 near-copy、VLM 成员检测和法律定性；修正上千样本合计不能写成全部 SD，加入近邻误报与预算条件。
- 下次复核：2027-04-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://www.usenix.org/conference/usenixsecurity23/presentation/carlini](https://www.usenix.org/conference/usenixsecurity23/presentation/carlini)；[https://arxiv.org/html/2301.13188](https://arxiv.org/html/2301.13188)；[https://arxiv.org/abs/2212.03860](https://arxiv.org/abs/2212.03860)；[https://papers.nips.cc/paper_files/paper/2024/hash/b2c892312af07f8a77afbeed188391f4-Abstract-Conference.html](https://papers.nips.cc/paper_files/paper/2024/hash/b2c892312af07f8a77afbeed188391f4-Abstract-Conference.html)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未重跑近邻/生成实验；图像复制、VLM 成员推断和法律侵权分别判断。

## privacy-poisoning

- 中文：`privacy/02-memorization-extraction/privacy-poisoning.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/02-memorization-extraction/privacy-poisoning.mdx`。
- 判定与修订：澄清 CIFAR 比例分母、语言模型抽取与图像 MIA 条件不同；DP 目标记录隐私不等于 k 条投毒整体影响用同一ε限制。
- 下次复核：2027-04-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://arxiv.org/html/2204.00032](https://arxiv.org/html/2204.00032)；[https://arxiv.org/abs/2302.10149](https://arxiv.org/abs/2302.10149)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未重跑投毒；分母和任务各自绑定实验，60 美元是历史可行性估计。

## training-data-extraction

- 中文：`privacy/02-memorization-extraction/training-data-extraction.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/02-memorization-extraction/training-data-extraction.mdx`。
- 判定与修订：稳定机制保留，更新历史攻击有效性口径与样本来源归因；canary 审计和原文抽取是独立指标且非全保证。
- 下次复核：2027-01-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://arxiv.org/abs/2012.07805](https://arxiv.org/abs/2012.07805)；[https://arxiv.org/abs/2202.07646](https://arxiv.org/abs/2202.07646)；[https://arxiv.org/abs/2311.17035](https://arxiv.org/abs/2311.17035)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未重测当前服务；历史攻击有效性不代表当前端点，未抽出也不证明未记忆。

## agent-tool-exfiltration

- 中文：`privacy/04-rag-agents/agent-tool-exfiltration.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/04-rag-agents/agent-tool-exfiltration.mdx`。
- 判定与修订：加入最新跨 context/subagent/compaction 攻击面；红队改受控 canary，域名准入与数据接收授权分开，有限零外发不作通用保证。CamoLeak 披露日期纠正，EchoLeak 读取限制如实记录。
- 下次复核：2026-12-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://alignment.anthropic.com/2026/red-teaming-auto-mode/](https://alignment.anthropic.com/2026/red-teaming-auto-mode/)；[https://www.legitsecurity.com/blog/camoleak-critical-github-copilot-vulnerability-leaks-private-source-code](https://www.legitsecurity.com/blog/camoleak-critical-github-copilot-vulnerability-leaks-private-source-code)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：EchoLeak 等旧入口未能重新获取完整正文，移除其细节/补丁的重新认证；保留实际重开的 CamoLeak 和 2026 红队。

## cross-session-memory-bleed

- 中文：`privacy/04-rag-agents/cross-session-memory-bleed.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/04-rag-agents/cross-session-memory-bleed.mdx`。
- 判定与修订：保留生产事故与隔离原则；修正可能暴露/实际暴露分母，验收增加不同认证身份、撤权、取消/重试和阳性对照。
- 下次复核：2027-01-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://openai.com/index/march-20-chatgpt-outage/](https://openai.com/index/march-20-chatgpt-outage/)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：事故分母仅指定活跃 Plus 时窗；未对当前产品或应用运行 A/B 身份隔离测试。

## embedding-inversion

- 中文：`privacy/04-rag-agents/embedding-inversion.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/04-rag-agents/embedding-inversion.mdx`。
- 判定与修订：区分词 F1、词召回和 exact-match，纠正迭代收敛等于唯一原文；厂商 at-rest/CMK 是存储控制不阻服务运行时访问。
- 下次复核：2027-01-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://arxiv.org/abs/2004.00053](https://arxiv.org/abs/2004.00053)；[https://aclanthology.org/2023.emnlp-main.765/](https://aclanthology.org/2023.emnlp-main.765/)；[https://docs.pinecone.io/admin/security/security-overview](https://docs.pinecone.io/admin/security/security-overview)；[https://learn.microsoft.com/en-us/azure/search/search-security-manage-encryption-keys](https://learn.microsoft.com/en-us/azure/search/search-security-manage-encryption-keys)；[https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf](https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未复现反演/检查账户权限；词 F1、exact-match、运行时访问与法律匿名不互相认证。

## rag-retrieval-leakage

- 中文：`privacy/04-rag-agents/rag-retrieval-leakage.mdx`；英文：`i18n/en/docusaurus-plugin-content-docs-privacy/current/04-rag-agents/rag-retrieval-leakage.mdx`。
- 判定与修订：实质修正 Azure security trimming 被一概判检索后泄露、RLS 应用无法绕过等过强断言；namespace 需身份授权，可信候选与外部披露分开。
- 下次复核：2026-12-29；事件触发：新攻击、接口或依赖版本变化。
- 实际打开的一手依据：[https://docs.pinecone.io/guides/index-data/implement-multitenancy](https://docs.pinecone.io/guides/index-data/implement-multitenancy)；[https://learn.microsoft.com/en-us/azure/search/search-security-trimming-for-azure-search](https://learn.microsoft.com/en-us/azure/search/search-security-trimming-for-azure-search)；[https://learn.microsoft.com/en-us/azure/search/vector-search-filters](https://learn.microsoft.com/en-us/azure/search/vector-search-filters)；[https://docs.weaviate.io/weaviate/manage-collections/multi-tenancy](https://docs.weaviate.io/weaviate/manage-collections/multi-tenancy)；[https://qdrant.tech/documentation/manage-data/multitenancy/](https://qdrant.tech/documentation/manage-data/multitenancy/)；[https://www.postgresql.org/docs/current/ddl-rowsecurity.html](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)。
- 处理结论：已修订；保留独立条目与有依据的基础机制。
- 残余待核/适用限制：未运行真实租户数据库/索引；RLS 特权、可信身份传递和过滤模式须按配置核。

## 最终交付检查

36 对已逐篇复核，0 篇尚未开始；72 篇均有真实复核日期、下次复核日期与按文章选择的 inline 事件触发数组。已保存中英同事实修订与各篇限制；不将实际账户配置、未复现性能/攻击或受限来源标成已认证。完成本批终审后停止写入，由主执行者统一格式化、索引与整站验证。

最终页面抽查补记：machine-unlearning 中英文防护原理、合规映射和英文图示再次对齐；移除经验审计可证明完整遗忘及直接认证法律删除的暗示。保留形式证明、同程序重训基线与受测经验信号的区别。
