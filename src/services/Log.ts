import NodeConsole from "console";
import NodeUtil from "util";
import {format} from "date-fns";

// https://github.com/chalk/ansi-styles/blob/main/index.js
const red = "\x1b[31m";    // error
const yellow = "\x1b[33m"; // warn
const green = "\x1b[32m";  // info
const blue = "\x1b[34m";   // debug
const reset = "\x1b[39m";  // reset

class CustomConsole extends NodeConsole.Console {
  formatDate(date: Date): string {
    return format(new Date(), "yyyy-mm-dd HH:mm:ss");
  }

  override error(...args: unknown[]): void {
    super.error(`[${this.formatDate(new Date())}] ${red}ERROR${reset}:`, NodeUtil.format(...args));
  }

  override warn(...args: unknown[]): void {
    super.warn(`[${this.formatDate(new Date())}] ${yellow}WARN${reset}:`, NodeUtil.format(...args));
  }

  override info(...args: unknown[]): void {
    super.info(`[${this.formatDate(new Date())}] ${green}INFO${reset}:`, NodeUtil.format(...args));
  }

  override debug(...args: unknown[]): void {
    super.debug(`[${this.formatDate(new Date())}] ${blue}DEBUG${reset}:`, NodeUtil.format(...args));
  }
}

export const Log = new CustomConsole({
  stdout: process.stdout,
  stderr: process.stderr,
});
