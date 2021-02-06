export function isArray(val) {
  return Array.isArray(val);
}

export function isFunction(val) {
  return typeof val === "function";
}

export function isPromise(val) {
  return (
    val !== undefined &&
    val !== null &&
    typeof val.then === "function" &&
    typeof val.catch === "function"
  );
}

export function parseUnit(val) {
  const defaultUnit = "px";
  const CSS_UNIT = ["px", "%", "vw", "vh", "em", "rem"];
  const validReg = new RegExp(
    "^.?\\d+(.\\d+)?(" + CSS_UNIT.join("|") + ")$",
    "i"
  );
  if (validReg.test(val)) {
    return val;
  } else if (typeof val === "number") {
    return val + defaultUnit;
  }
  const integer = parseInt(val);
  return Number.isNaN(integer) ? null : integer + defaultUnit;
}
