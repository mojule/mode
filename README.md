# mode

Helper functions for dealing with Linux style permissions

Does not handle sticky bit or set uid/gid on execute - I don't need these - 
happy to accept pull requests, or will add when I need it

`npm install @mojule/mode`

## updateMode

```js
import { updateMode } from '@mojule/mode'

// resource's existing permssions
const modeBefore = 0o0777

// new permissions
const modeAfter = updateMode( 'u+rw,g-rwx,o-rx', modeBefore )

// 702
console.log( modeAfter.toString( 8 ) )
```

## canAccess

```js
import { canAccess, r, w, x } from '@mojule/mode'

// determine these from your environment eg `isRoot = req.user.id === root.id`
const rootInGroupFile = { 
  isDirectory: false, 
  isRoot: true, 
  isOwner: false, 
  isGroup: true 
}

// the file's permissions
const rootInGroupFileMode = 0o0010

// root can always read/write - showing creating request from built in consts
const requestExecute = r | w | x

// root can execute a file if user, group or other is set
const canRootInGroupExecuteFile = canAccess( 
  rootInGroupFile, rootInGroupFileMode, requestExecute
)

// true
console.log( canRootInGroupExecuteFile )
```

## symbolic notation

```js
import { createSymbolicNotation, parseSymbolicNotation } from '@mojule/mode'

const note = createSymbolicNotation( 0o0700 )

// rwx------
console.log( note )

const mode = parseSymbolicNotation( 'rw-rw-rw-' )

// 666
console.log( mode.toString( 8 ) )
```

## symbolic update notation

```js
import { parseSymbolicUpdate, applySymbolicUpdateGroup } from '@mojule/mode'

const updates = parseSymbolicUpdate( 'u+rw,g-rwx,o-rx' )

const modeBefore = 0o0777

const modeAfter = applySymbolicUpdateGroup( updates, modeBefore )

// 702
console.log( modeAfter.toString( 8 ) )
```

## core

```js
import { 
  hasBit, getBit, setBit, clearBit, hasRequestBit,
  r, w, x
} from '@mojule/mode'

// true
console.log( hasBit( 'g', 'x', 0o0710 ) )

// false
console.log( hasBit( 'o', 'x', 0o0710 ) )

// 0o0010
console.log( getBit( 'g', 'x', 0o0710 ) )

// 0o0000
console.log( getBit( 'o', 'x', 0o0710 ) )

// 0o0700
console.log( clearBit( 'g', 'x', 0o0710 ) )

// true
console.log( hasRequestBit( 'r', r | w | x ) )

// false
console.log( hasRequestBit( 'r', w | x ) )
```

## license 

MIT License

Copyright (c) 2021 Nik Coughlin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
