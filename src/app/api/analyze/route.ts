import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import { readFile } from "fs/promises";
import path from "path";

const execAsync = promisify(exec);

export async function GET() {
  try {
    const projectRoot = process.cwd();
    const pythonScript = path.join(projectRoot, "python-scripts", "analyze.py");
    const venvPython = path.join(projectRoot, "venv", "bin", "python");
    const outputFile = path.join(projectRoot, "python-data", "analysis_results.json");

    console.log("Running Python analysis...");
    const { stdout, stderr } = await execAsync(`"${venvPython}" "${pythonScript}"`);

    if (stderr) {
      console.warn("Python stderr:", stderr);
    }

    console.log("Python stdout:", stdout);

    const data = await readFile(outputFile, "utf-8");
    const analysisResults = JSON.parse(data);

    return NextResponse.json(analysisResults);
  } catch (error) {
    console.error("Error running Python analysis:", error);
    return NextResponse.json(
      { error: "Failed to run analysis" },
      { status: 500 }
    );
  }
}
