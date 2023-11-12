import { randomUUID } from "node:crypto";
import { performance, PerformanceObserver } from "node:perf_hooks";
import { env } from "node:process";

import { Logger } from ".";

// FIXME: MEASURED TIME IS NOT ACCURATE
class Timer {
  private static INSTANCE: Timer | null = null;
  private static readonly DEBUG: string = env["DEBUG"] ?? "false";

  private constructor() {
    Logger.getInstance()?.info("Timer created");
    const performanceObserver = new PerformanceObserver((item) => {
      const entries = item.getEntries();
      entries.forEach((entry) => {
        const { duration, name } = entry;
        Logger.getInstance()?.info(
          `${name} @ ${(duration / 1000).toPrecision(3)}s`
        );
      });
      performance.clearMarks();
    });
    performanceObserver.observe({ entryTypes: ["measure"] });
  }

  public static getInstance(): Timer | null {
    if (Timer.DEBUG === "true" && Timer.INSTANCE !== null) {
      return Timer.INSTANCE;
    } else if (Timer.DEBUG === "true" && Timer.INSTANCE === null) {
      Timer.INSTANCE = new Timer();
      return Timer.INSTANCE;
    }

    return null;
  }

  public async results<Type>(
    name: string,
    process: () => Promise<Type> | Type
  ) {
    const uuid = randomUUID();
    try {
      const _process = async () => process();
      performance.mark(`${uuid}-START`);
      await _process();
      performance.mark(`${uuid}-END`);
      performance.measure(name, `${uuid}-START`, `${uuid}-END`);
    } catch (error: unknown) {
      Logger.getInstance()?.error(`${name}() error:`, error);
    }
  }
}

export { Timer };
