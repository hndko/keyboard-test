export const keys = [
  // Row 1 (Function Keys)
  [
    { code: "Escape", label: "Esc", width: 1 },
    { code: "F1", label: "F1", width: 1 },
    { code: "F2", label: "F2", width: 1 },
    { code: "F3", label: "F3", width: 1 },
    { code: "F4", label: "F4", width: 1 },
    { code: "F5", label: "F5", width: 1 },
    { code: "F6", label: "F6", width: 1 },
    { code: "F7", label: "F7", width: 1 },
    { code: "F8", label: "F8", width: 1 },
    { code: "F9", label: "F9", width: 1 },
    { code: "F10", label: "F10", width: 1 },
    { code: "F11", label: "F11", width: 1 },
    { code: "F12", label: "F12", width: 1 },
    { code: "Delete", label: "Del", width: 1.5, align: "right" },
    // Add PrtSc, Scroll, Pause if needed, but laptop layouts vary.
  ],
  // Row 2 (Numbers)
  [
    { code: "Backquote", label: "`", labelShift: "~", width: 1 },
    { code: "Digit1", label: "1", labelShift: "!", width: 1 },
    { code: "Digit2", label: "2", labelShift: "@", width: 1 },
    { code: "Digit3", label: "3", labelShift: "#", width: 1 },
    { code: "Digit4", label: "4", labelShift: "$", width: 1 },
    { code: "Digit5", label: "5", labelShift: "%", width: 1 },
    { code: "Digit6", label: "6", labelShift: "^", width: 1 },
    { code: "Digit7", label: "7", labelShift: "&", width: 1 },
    { code: "Digit8", label: "8", labelShift: "*", width: 1 },
    { code: "Digit9", label: "9", labelShift: "(", width: 1 },
    { code: "Digit0", label: "0", labelShift: ")", width: 1 },
    { code: "Minus", label: "-", labelShift: "_", width: 1 },
    { code: "Equal", label: "=", labelShift: "+", width: 1 },
    { code: "Backspace", label: "Backspace", width: 2, align: "right" },
  ],
  // Row 3 (QWERTY)
  [
    { code: "Tab", label: "Tab", width: 1.5 },
    { code: "KeyQ", label: "Q", width: 1 },
    { code: "KeyW", label: "W", width: 1 },
    { code: "KeyE", label: "E", width: 1 },
    { code: "KeyR", label: "R", width: 1 },
    { code: "KeyT", label: "T", width: 1 },
    { code: "KeyY", label: "Y", width: 1 },
    { code: "KeyU", label: "U", width: 1 },
    { code: "KeyI", label: "I", width: 1 },
    { code: "KeyO", label: "O", width: 1 },
    { code: "KeyP", label: "P", width: 1 },
    { code: "BracketLeft", label: "[", labelShift: "{", width: 1 },
    { code: "BracketRight", label: "]", labelShift: "}", width: 1 },
    { code: "Backslash", label: "\\", labelShift: "|", width: 1.5 },
  ],
  // Row 4 (ASDF)
  [
    { code: "CapsLock", label: "Caps Lock", width: 1.75 },
    { code: "KeyA", label: "A", width: 1 },
    { code: "KeyS", label: "S", width: 1 },
    { code: "KeyD", label: "D", width: 1 },
    { code: "KeyF", label: "F", width: 1 },
    { code: "KeyG", label: "G", width: 1 },
    { code: "KeyH", label: "H", width: 1 },
    { code: "KeyJ", label: "J", width: 1 },
    { code: "KeyK", label: "K", width: 1 },
    { code: "KeyL", label: "L", width: 1 },
    { code: "Semicolon", label: ";", labelShift: ":", width: 1 },
    { code: "Quote", label: "'", labelShift: '"', width: 1 },
    { code: "Enter", label: "Enter", width: 2.25, align: "right" },
  ],
  // Row 5 (ZXCV)
  [
    { code: "ShiftLeft", label: "Shift", width: 2.25 },
    { code: "KeyZ", label: "Z", width: 1 },
    { code: "KeyX", label: "X", width: 1 },
    { code: "KeyC", label: "C", width: 1 },
    { code: "KeyV", label: "V", width: 1 },
    { code: "KeyB", label: "B", width: 1 },
    { code: "KeyN", label: "N", width: 1 },
    { code: "KeyM", label: "M", width: 1 },
    { code: "Comma", label: ",", labelShift: "<", width: 1 },
    { code: "Period", label: ".", labelShift: ">", width: 1 },
    { code: "Slash", label: "/", labelShift: "?", width: 1 },
    { code: "ShiftRight", label: "Shift", width: 2.75, align: "right" },
  ],
  // Row 6 (Mods)
  [
    { code: "ControlLeft", label: "Ctrl", width: 1.25 },
    { code: "MetaLeft", label: "Win", labelMac: "Cmd", width: 1.25 },
    { code: "AltLeft", label: "Alt", labelMac: "Opt", width: 1.25 },
    { code: "Space", label: "", width: 6.25 },
    { code: "AltRight", label: "Alt", labelMac: "Opt", width: 1.25 },
    { code: "MetaRight", label: "Fn", labelMac: "Cmd", width: 1.25 }, // Often Fn or Menu or Win
    { code: "ControlRight", label: "Ctrl", width: 1.25 },
    // Arrow keys? Usually separate.
  ],
];

export const arrowKeys = [
  { code: "ArrowUp", label: "↑", width: 1 },
  { code: "ArrowLeft", label: "←", width: 1 },
  { code: "ArrowDown", label: "↓", width: 1 },
  { code: "ArrowRight", label: "→", width: 1 },
];
