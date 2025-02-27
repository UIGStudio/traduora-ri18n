"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    en: (count) => {
        let key;
        if (count === 1) {
            key = 'one';
        }
        else {
            key = 'many';
        }
        return [key];
    },
    pl: (count) => {
        let key;
        if (count === 1) {
            key = 'one';
        }
        else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
            key = 'few';
        }
        else {
            key = 'many';
        }
        return [key];
    },
};
//# sourceMappingURL=pluralizers.js.map