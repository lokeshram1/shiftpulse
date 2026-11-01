import path from "node:path";
import fs from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { PresentationFile } from "@oai/artifact-tool";

const skillDir = "C:/Users/lokar/.codex/plugins/cache/openai-primary-runtime/presentations/26.1026.10807/skills/presentations";
const workspaceDir = "C:/Users/lokar/OneDrive/Documents/ChatGPT/webiste/presentation_build";
const candidatePath = path.join(workspaceDir, "output", "AeroMitra_MBA_Presentation.pptx");
const finalDir = path.join(workspaceDir, "final");
const finalPath = path.join(finalDir, "AeroMitra_MBA_Presentation.pptx");
await fs.mkdir(finalDir, { recursive: true });
const { finalizePresentation } = await import(pathToFileURL(path.join(skillDir, "container_tools/artifact_tool_utils.mjs")).href);
const result = await finalizePresentation({
  explicitTotalSlideCount: 12,
  requiredNativeTableOwnerSlides: [],
  requiredNativeChartOwnerSlides: [],
  workspaceDir,
  candidatePath,
  finalPath,
  pythonExecutable: "C:/Users/lokar/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe",
  integrityValidatorPath: path.join(skillDir, "container_tools/inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(skillDir, "container_tools/inspect_presentation_layout_geometry.py"),
  layoutArgs: ["--expected-slide-size-emu", "12192000,6858000", "--validate-bullet-geometry", "--validate-heading-fit"],
  fontPolicy: { basis: "design", families: ["Aptos", "Aptos Display"] },
  verifyArtifactToolImport: true,
  receiptPath: path.join(workspaceDir, "AeroMitra_MBA_Presentation.validation.json"),
});
console.log(JSON.stringify({ finalPath, result }));
