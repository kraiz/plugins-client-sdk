## [1.0.5](https://github.com/Staffbase/plugins-client-sdk/compare/v1.0.4...v1.0.5) (2018-09-14)


### Bug Fixes

* **connection:** prevent multiple connection promisses ([1b9cea9](https://github.com/Staffbase/plugins-client-sdk/commit/1b9cea9))

## [1.0.4](https://github.com/Staffbase/plugins-client-sdk/compare/v1.0.3...v1.0.4) (2018-09-10)


### Bug Fixes

* **docs:** switch from relative to absolute links in README.md to fix path mistake in npm ([a1af8d9](https://github.com/Staffbase/plugins-client-sdk/commit/a1af8d9))

## [1.0.3](https://github.com/Staffbase/plugins-client-sdk/compare/v1.0.2...v1.0.3) (2018-09-04)


### Bug Fixes

* **postmessage:** fixes boolean property- changes the prop native to real boolean value ([9c55000](https://github.com/Staffbase/plugins-client-sdk/commit/9c55000))

## [1.0.2](https://github.com/Staffbase/plugins-client-sdk/compare/v1.0.1...v1.0.2) (2018-09-04)


### Bug Fixes

* **release:** adds build step to release builded files ([ee0c9a6](https://github.com/Staffbase/plugins-client-sdk/commit/ee0c9a6))

## [1.0.1](https://github.com/Staffbase/plugins-client-sdk/compare/v1.0.0...v1.0.1) (2018-08-31)


### Bug Fixes

* **main:** adds missing arguments ([57baa11](https://github.com/Staffbase/plugins-client-sdk/commit/57baa11))
* **travis:** appends token line to npmrc ([5cb2825](https://github.com/Staffbase/plugins-client-sdk/commit/5cb2825))
* **travis:** remove before install ([6ef5a51](https://github.com/Staffbase/plugins-client-sdk/commit/6ef5a51))


### Reverts

* This reverts commit cd22e036692ce0b16141e2c0f40602528b6440f6 ([34f1729](https://github.com/Staffbase/plugins-client-sdk/commit/34f1729))

# [1.0.0]
Initial Release

### Features

#### Device informations

1. `getAppVersion` -> string
2. `isNativeApp` -> boolean
3. `isMobileApp` -> boolean
4. `isAndroidDevice` -> boolean
5. `isIosDevice` -> boolean
6. `deviceCanDownload` -> boolean

#### Language information

1. `getBranchLanguages` -> object
2. `getBranchDefaultLanguage` -> object
3. `getContentLanguages` -> object

#### Invoke native methods

1. `getPreferredContentLocale` {locales: object|array} -> string
2. `openLink` {url: string} -> boolean
3. `openLinkExternal` {url: string} -> boolean
4. `openLinkInternal` {url: string} -> boolean
5. `openNativeFileDialog` -> Blob **!experimental**
