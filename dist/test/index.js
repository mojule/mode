"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const __1 = require("..");
const core_1 = require("../core");
const keys_1 = require("../core/keys");
const masks_1 = require("../core/masks");
const predicates_1 = require("../core/predicates");
const symbolic_notation_1 = require("../symbolic-notation");
const parse_1 = require("../symbolic-notation/parse");
const predicates_2 = require("../symbolic-notation/predicates");
const allSet = 0o0777;
const allEmpty = 0o0000;
const updateFixtures = [];
updateFixtures.push(['a+r', allEmpty, 0o0444], ['a-x', allSet, 0o0666], ['a+rx', allEmpty, 0o0555], ['u=rw,g=r,o=', allEmpty, 0o0640], ['u=rw,g=r,o=', allSet, 0o0640], ['u+w,go-w', allEmpty, 0o0200], ['u+w,go-w', allSet, 0o0755], ['ug=rw', allEmpty, 0o0660], ['u+rw,g-rwx,o-rx', allSet, 0o0702], [0o0664, allSet, 0o0664], [0o0664, allEmpty, 0o0664]);
const updateExceptions = [];
updateExceptions.push(['$', 'Unexpected symbol at position 0: $'], ['ar', 'Unexpected symbol at position 1: r'], ['a+a', 'Unexpected symbol at position 2: a']);
const notationFixtures = [];
notationFixtures.push(['---------', allEmpty], ['rwxrwxrwx', allSet]);
const octal = (value) => value.toString(8);
const notationToString = (notation) => typeof notation === 'number' ? octal(notation) : notation;
const updateTitle = (mode, notation) => `chmod ${octal(mode)} ${notationToString(notation)}`;
describe('symbolic-notation', () => {
    describe('predicates', () => {
        it('isSymbolicNotation', () => {
            assert(predicates_2.isSymbolicNotation('---------'));
        });
        it('!isSymbolicNotation', () => {
            assert(!predicates_2.isSymbolicNotation('--------$'));
        });
    });
    describe('parse', () => {
        notationFixtures.forEach(([notation, expect]) => {
            it(`parse ${notation}`, () => {
                assert.strictEqual(parse_1.parseSymbolicNotation(notation), expect);
            });
            it(`createSymbolicNotation ${octal(expect)}`, () => {
                assert.strictEqual(symbolic_notation_1.createSymbolicNotation(expect), notation);
            });
        });
    });
});
describe('symbolic-update', () => {
    describe('updateMode', () => {
        updateFixtures.forEach(([notation, mode, expect]) => {
            it(updateTitle(mode, notation), () => {
                assert.strictEqual(__1.updateMode(notation, mode), expect);
            });
        });
    });
    describe('exceptions', () => {
        updateExceptions.forEach(([notation, message]) => {
            it(`updateMode ${notation}`, () => {
                assert.throws(() => __1.updateMode(notation, 0), { message });
            });
        });
    });
});
describe('core', () => {
    describe('bit', () => {
        describe('hasBit', () => {
            keys_1.roleKeys.forEach(role => {
                keys_1.permKeys.forEach(perm => {
                    it(`hasBit ${role} ${perm} ${octal(allSet)}`, () => {
                        assert(core_1.hasBit(role, perm, allSet));
                    });
                    it(`!hasBit ${role} ${perm} ${octal(allEmpty)}`, () => {
                        assert(!core_1.hasBit(role, perm, allEmpty));
                    });
                });
            });
        });
    });
    describe('predicates', () => {
        keys_1.roleKeys.forEach(key => {
            it(`isRoleKey ${key}`, () => {
                assert(predicates_1.isRoleKey(key));
            });
        });
        keys_1.permKeys.forEach(key => {
            it(`!isRoleKey ${key}`, () => {
                assert(!predicates_1.isRoleKey(key));
            });
        });
    });
});
const accessFixtures = [
    [
        'root can read/write file with no permissions set',
        { isDirectory: false, isRoot: true, isOwner: false, isGroup: false },
        allEmpty,
        masks_1.r | masks_1.w,
        true
    ],
    [
        'root can read/write/execute directory with no permissions set',
        { isDirectory: true, isRoot: true, isOwner: false, isGroup: false },
        allEmpty,
        masks_1.r | masks_1.w | masks_1.x,
        true
    ],
    [
        'root cannot execute a file with no permissions set',
        { isDirectory: false, isRoot: true, isOwner: false, isGroup: false },
        allEmpty,
        masks_1.x,
        false
    ],
    [
        'root can execute a file while owner',
        { isDirectory: false, isRoot: true, isOwner: true, isGroup: false },
        parse_1.parseSymbolicNotation('--x------'),
        masks_1.x,
        true
    ],
    [
        'root can execute a file while in group',
        { isDirectory: false, isRoot: true, isOwner: false, isGroup: true },
        parse_1.parseSymbolicNotation('-----x---'),
        masks_1.x,
        true
    ],
    [
        'root can execute a file with other',
        { isDirectory: false, isRoot: true, isOwner: false, isGroup: false },
        parse_1.parseSymbolicNotation('--------x'),
        masks_1.x,
        true
    ],
    [
        'other cannot access anything when empty',
        { isDirectory: false, isRoot: false, isOwner: false, isGroup: false },
        allEmpty,
        masks_1.r,
        false
    ]
];
describe('canAccess', () => {
    accessFixtures.forEach(([title, process, mode, request, expect]) => {
        it(title, () => {
            assert.strictEqual(__1.canAccess(process, mode, request), expect);
        });
    });
});
//# sourceMappingURL=index.js.map