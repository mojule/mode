"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const __1 = require("..");
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
            assert(__1.isSymbolicNotation('---------'));
        });
        it('!isSymbolicNotation', () => {
            assert(!__1.isSymbolicNotation('--------$'));
        });
    });
    describe('parse', () => {
        notationFixtures.forEach(([notation, expect]) => {
            it(`parse ${notation}`, () => {
                assert.strictEqual(__1.parseSymbolicNotation(notation), expect);
            });
            it(`createSymbolicNotation ${octal(expect)}`, () => {
                assert.strictEqual(__1.createSymbolicNotation(expect), notation);
            });
        });
    });
});
describe('symbolic-update', () => {
    describe('updateMode', () => {
        updateFixtures.forEach(([notation, mode, expect]) => {
            it(updateTitle(mode, notation), () => {
                assert.strictEqual(__1.updateMode(mode, notation), expect);
            });
        });
    });
    describe('exceptions', () => {
        updateExceptions.forEach(([notation, message]) => {
            it(`updateMode ${notation}`, () => {
                assert.throws(() => __1.updateMode(0, notation), { message });
            });
        });
    });
});
describe('core', () => {
    describe('bit', () => {
        describe('hasBit', () => {
            __1.roleKeys.forEach(role => {
                __1.permKeys.forEach(perm => {
                    it(`hasBit ${role} ${perm} ${octal(allSet)}`, () => {
                        assert(__1.hasBit(allSet, role, perm));
                    });
                    it(`!hasBit ${role} ${perm} ${octal(allEmpty)}`, () => {
                        assert(!__1.hasBit(allEmpty, role, perm));
                    });
                });
            });
        });
    });
    describe('predicates', () => {
        __1.roleKeys.forEach(key => {
            it(`isRoleKey ${key}`, () => {
                assert(__1.isRoleKey(key));
            });
        });
        __1.permKeys.forEach(key => {
            it(`!isRoleKey ${key}`, () => {
                assert(!__1.isRoleKey(key));
            });
        });
    });
});
const accessFixtures = [
    [
        'root can read/write file with no permissions set',
        {
            isRoot: true
        },
        __1.rw,
        true
    ],
    [
        'root can read/write/execute directory with no permissions set',
        {
            isDirectory: true,
            isRoot: true
        },
        __1.rwx,
        true
    ],
    [
        'root cannot execute a file with no permissions set',
        {
            isRoot: true
        },
        __1.x,
        false
    ],
    [
        'root can execute a file while owner',
        {
            isRoot: true,
            isOwner: true,
            permissions: __1.parseSymbolicNotation('--x------')
        },
        __1.x,
        true
    ],
    [
        'root can execute a file while in group',
        {
            isRoot: true,
            isGroup: true,
            permissions: __1.parseSymbolicNotation('-----x---')
        },
        __1.x,
        true
    ],
    [
        'root can execute a file with other',
        {
            isRoot: true,
            permissions: __1.parseSymbolicNotation('--------x')
        },
        __1.x,
        true
    ],
    [
        'other can access nothing when options empty',
        undefined,
        0,
        true
    ]
];
__1.permKeys.forEach(request => {
    accessFixtures.push([
        `no ${request} when options empty`,
        undefined,
        __1.accessMasks[request],
        false
    ]);
});
describe('canAccess', () => {
    accessFixtures.forEach(([title, process, request, expect]) => {
        it(title, () => {
            assert.strictEqual(__1.canAccess(request, process), expect);
        });
    });
});
//# sourceMappingURL=index.js.map