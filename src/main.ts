import {Log} from "./services/Log.js";
import {SignalHandler} from "./services/SignalHandler.js";

/* Some random comment */
/* Some random comment */

try {
  SignalHandler.initialize();
  /* Some random comment */
  Log.debug("One");
  Log.debug("Two");
  Log.debug("Three");
  /* Some random comment */
  /* Some random comment */
  throw new Error("This error should be on line 15");
  /* Some random comment */
  /* Some random comment */
  /* Some random comment */
} catch (error) {
  if (error instanceof Error) {
    Log.error(error.stack);
  }
}
