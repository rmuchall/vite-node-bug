import Signals = NodeJS.Signals;
import {Log} from "./Log.js";

export abstract class SignalHandler {
  static initialize(): void {
    Log.debug("SignalHandler: Initialize");
    process.on("SIGINT", () => SignalHandler.handleSignal("SIGINT"));
    process.on("SIGHUP", () => SignalHandler.handleSignal("SIGHUP"));
    process.on("SIGQUIT", () => SignalHandler.handleSignal("SIGQUIT"));
    process.on("SIGTERM", () => SignalHandler.handleSignal("SIGTERM"));
    process.on("uncaughtException", (error) => SignalHandler.handleError(error));
    process.on("exit", (errorCode) => SignalHandler.handleExit(errorCode));
  }

  static handleSignal(signal: Signals): void {
    Log.debug("SignalHandler: Received signal = [%s]", signal.toString());

    // Calls handleExit() for cleanup
    process.exit(1);
  }

  static handleError(error: Error): void {
    Log.error("SignalHandler: Uncaught exception");
    Log.error(error);

    // Calls handleExit() for cleanup
    process.exit(1);
  }

  static handleExit(errorCode: number): void {
    SignalHandler.cleanup();
    Log.debug("SignalHandler: Exit()");
  }

  static cleanup(): void {
    Log.debug("SignalHandler: Removing listeners");
    process.removeAllListeners();
  }
}
