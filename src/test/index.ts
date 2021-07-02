import * as assert from 'assert'
import { canAccess, updateMode } from '..'
import { hasBit } from '../core'
import { permKeys, roleKeys } from '../core/keys'
import { r, w, x } from '../core/masks'
import { isRoleKey } from '../core/predicates'
import { Process } from '../core/types'
import { createSymbolicNotation } from '../symbolic-notation'
import { parseSymbolicNotation } from '../symbolic-notation/parse'
import { isSymbolicNotation } from '../symbolic-notation/predicates'
import { SymbolicNotation } from '../symbolic-notation/types'

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
          assert.strictEqual(updateMode(notation, mode), expect)
        })
      }
    )
  })

  describe('exceptions', () => {
    updateExceptions.forEach(
      ([notation, message]) => {
        it(`updateMode ${notation}`, () => {
          assert.throws(() => updateMode(notation, 0), { message })
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
            assert(hasBit(role, perm, allSet))
          })

          it(`!hasBit ${role} ${perm} ${octal(allEmpty)}`, () => {
            assert(!hasBit(role, perm, allEmpty))
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
  process: Process,
  mode: number,
  request: number,
  expect: boolean
]

const accessFixtures: AccessFixture[] = [
  [
    'root can read/write file with no permissions set',
    { isDirectory: false, isRoot: true, isOwner: false, isGroup: false },
    allEmpty,
    r | w,
    true
  ],
  [
    'root can read/write/execute directory with no permissions set',
    { isDirectory: true, isRoot: true, isOwner: false, isGroup: false },
    allEmpty,
    r | w | x,
    true
  ],
  [
    'root cannot execute a file with no permissions set',
    { isDirectory: false, isRoot: true, isOwner: false, isGroup: false },
    allEmpty,
    x,
    false
  ],
  [
    'root can execute a file while owner',
    { isDirectory: false, isRoot: true, isOwner: true, isGroup: false },
    parseSymbolicNotation( '--x------' ),
    x,
    true
  ],
  [
    'root can execute a file while in group',
    { isDirectory: false, isRoot: true, isOwner: false, isGroup: true },
    parseSymbolicNotation( '-----x---' ),
    x,
    true
  ],
  [
    'root can execute a file with other',
    { isDirectory: false, isRoot: true, isOwner: false, isGroup: false },
    parseSymbolicNotation( '--------x' ),
    x,
    true
  ],
  [
    'other cannot access anything when empty',
    { isDirectory: false, isRoot: false, isOwner: false, isGroup: false },
    allEmpty,
    r,
    false
  ]
]

describe('canAccess', () => {
  accessFixtures.forEach(
    ([title, process, mode, request, expect]) => {
      it(title, () => {
        assert.strictEqual(canAccess(process, mode, request), expect)
      })
    }
  )
})