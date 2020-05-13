import { EntryIndex } from "./project/EntryIndex";
require("../scss/style.scss");

namespace mask {
  const entry: EntryIndex = new EntryIndex();
  entry.run();
}
