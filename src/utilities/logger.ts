/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { env } from "node:process";

import chalk from "chalk";

// FIXME: Fix not creating an instance at all if debug is true.
class Logger {
  private static INSTANCE: Logger | null = null;

  private static readonly DEBUG = env["DEBUG"];

  private constructor() {
    chalk.level = 3;
  }

  public static getInstance(): Logger | null {
    if (Logger.DEBUG === "true" && Logger.INSTANCE !== null) {
      return Logger.INSTANCE;
    } else if (Logger.DEBUG === "true" && Logger.INSTANCE === null) {
      Logger.INSTANCE = new Logger();
      Logger.INSTANCE.info("Logger created");
      return Logger.INSTANCE;
    }
    return null;
  }

  public error(message: string, object?: unknown): Logger | null {
    if (object === undefined)
      console.error(chalk.blueBright(`[ERROR]: ${message}`));
    else {
      console.error(
        chalk.blueBright(`[ERROR]: ${message}\n${this.pretty(object)}`)
      );
    }

    if (Logger.INSTANCE !== null) return Logger.getInstance();
    return null;
  }

  public info(message: string, object?: unknown): Logger | null {
    if (object === undefined)
      console.info(chalk.blueBright(`[INFO]: ${message}`));
    else {
      console.info(
        chalk.blueBright(`[INFO]: ${message}\n${this.pretty(object)}`)
      );
    }

    if (Logger.INSTANCE !== null) return Logger.getInstance();
    return null;
  }

  public warn(message: string, object?: unknown): Logger | null {
    if (object === undefined)
      console.warn(chalk.yellowBright(`[WARN]: ${message}`));
    else {
      console.warn(
        chalk.yellowBright(`[WARN]: ${message}\n${this.pretty(object)}`)
      );
    }

    if (Logger.INSTANCE !== null) return Logger.getInstance();
    return null;
  }

  private pretty(object: unknown): string {
    return JSON.stringify(object, null, 2);
  }
}

export { Logger };
