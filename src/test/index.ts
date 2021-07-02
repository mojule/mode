import * as assert from 'assert'

import {
  canAccess, updateMode, hasBit, permKeys, roleKeys, isRoleKey,
  createSymbolicNotation, parseSymbolicNotation, isSymbolicNotation,
  AccessOptions, SymbolicNotation, accessMasks, x, rw, rwx
} from '..'

const allSet = 0o0777
const allEmpty = 0o0000

type UpdateFixture = [notation: string | number, mode: number, expect: number]

const updateFixtures: UpdateFixture[] = []

updateFixtures.push(
  ['a+r', allEmpty, 0o0444],
  ['a-x', allSet, 0o0666],
  ['a+rx', allEmpty, 0o0555],
  ['u=rw,g=r,o=', allEmpty, 0o0640],
  ['u=rw,g=r,o=', allSet, 0o0640],
  ['u+w,go-w', allEmpty, 0o0200],
  ['u+w,go-w', allSet, 0o0755],
  ['ug=rw', allEmpty, 0o0660],
  ['u+rw,g-rwx,o-rx', allSet, 0o0702],
  [0o0664, allSet, 0o0664],
  [0o0664, allEmpty, 0o0664]
)

type SymbolicUpdateException = [notation: string, message: string]

const updateExceptions: SymbolicUpdateException[] = []

updateExceptions.push(
  ['$', 'Unexpected symbol at position 0: $'],
  ['ar', 'Unexpected symbol at position 1: r'],
  ['a+a', 'Unexpected symbol at position 2: a']
)

type NotationFixture = [notation: SymbolicNotation, expect: number]

const notationFixtures: NotationFixture[] = []

notationFixtures.push(
  ['---------', allEmpty],
  ['rwxrwxrwx', allSet],
)

const octal = (value: number) => value.toString(8)

const notationToString = (notation: number | string) =>
  typeof notation === 'number' ? octal(notation) : notation

const updateTitle = (mode: number, notation: number | string) =>
  `chmod ${octal(mode)} ${notationToString(notation)}`

describe('symbolic-notation', () => {
  describe('predicates', () => {
    it('isSymbolicNotation', () => {
      assert(isSymbolicNotation('---------'))
    })

    it('!isSymbolicNotation', () => {
      assert(!isSymbolicNotation('--------$'))
    })
  })

  describe('parse', () => {
    notationFixtures.forEach(
      ([notation, expect]) => {
        it(`parse ${notation}`, () => {
          assert.strictEqual(parseSymbolicNotation(notation), expect)
        })

        it(`createSymbolicNotation ${octal(expect)}`, () => {
          assert.strictEqual(createSymbolicNotation(expect), notation)
        })
      }
    )
  })
})

describe('symbolic-update', () => {
  describe('updateMode', () => {
    updateFixtures.forEach(
      ([notation, mode, expect]) => {
        it(updateTitle(mode, notation), () => {
          assert.strictEqual(updateMode(mode, notation), expect)
        })
      }
    )
  })

  describe('exceptions', () => {
    updateExceptions.forEach(
      ([notation, message]) => {
        it(`updateMode ${notation}`, () => {
          assert.throws(() => updateMode(0, notation), { message })
        })
      }
    )
  })
})

describe('core', () => {
  describe('bit', () => {
    describe('hasBit', () => {
      roleKeys.forEach(role => {
        permKeys.forEach(perm => {
          it(`hasBit ${role} ${perm} ${octal(allSet)}`, () => {
            assert(hasBit(allSet, role, perm))
          })

          it(`!hasBit ${role} ${perm} ${octal(allEmpty)}`, () => {
            assert(!hasBit(allEmpty, role, perm))
          })
        })
      })
    })
  })

  describe('predicates', () => {
    roleKeys.forEach(key => {
      it(`isRoleKey ${key}`, () => {
        assert(isRoleKey(key))
      })
    })

    permKeys.forEach(key => {
      it(`!isRoleKey ${key}`, () => {
        assert(!isRoleKey(key))
      })
    })
  })
})

type AccessFixture = [
  title: string,
  process: Partial<AccessOptions> | undefined,
  request: number,
  expect: boolean
]

const accessFixtures: AccessFixture[] = [
  [
    'root can read/write file with no permissions set',
    {
      isRoot: true
    },
    rw,
    true
  ],
  [
    'root can read/write/execute directory with no permissions set',
    {
      isDirectory: true,
      isRoot: true
    },
    rwx,
    true
  ],
  [
    'root cannot execute a file with no permissions set',
    {
      isRoot: true
    },
    x,
    false
  ],
  [
    'root can execute a file while owner',
    {
      isRoot: true,
      isOwner: true,
      permissions: parseSymbolicNotation('--x------')
    },
    x,
    true
  ],
  [
    'root can execute a file while in group',
    {
      isRoot: true,
      isGroup: true,
      permissions: parseSymbolicNotation('-----x---')
    },
    x,
    true
  ],
  [
    'root can execute a file with other',
    {
      isRoot: true,
      permissions: parseSymbolicNotation('--------x')
    },
    x,
    true
  ],
  [
    'other can access nothing when options empty',
    undefined,
    0,
    true
  ]
]

permKeys.forEach(request => {
  accessFixtures.push(
    [
      `no ${request} when options empty`,
      undefined,
      accessMasks[request],
      false
    ],
  )
})

describe('canAccess', () => {
  accessFixtures.forEach(
    ([title, process, request, expect]) => {
      it(title, () => {
        assert.strictEqual(canAccess(request, process), expect)
      })
    }
  )
})