import reports from 'istanbul-reports';
import libReport from 'istanbul-lib-report';

import { CoverageConfig } from '../config/TestRunnerCoreConfig';
import { TestCoverage } from '../coverage/getTestCoverage';

export function writeCoverageReport(testCoverage: TestCoverage, config: CoverageConfig) {
  // create a context for report generation
  const context = libReport.createContext({
    dir: config.reportDir,
    watermarks: config.watermarks,
    coverageMap: testCoverage.coverageMap,
    defaultSummarizer: config.defaultSummarizer,
  } as libReport.ContextOptions);

  const reporters = config.reporters || [];

  for (const reporter of reporters) {
    const options = config.reportOptions?.[reporter] || {};
    const report = reports.create(reporter, {
      projectRoot: process.cwd(),
      maxCols: process.stdout.columns || 100,
      ...options
    });
    (report as any).execute(context);
  }
}
