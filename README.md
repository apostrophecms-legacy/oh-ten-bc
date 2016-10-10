This module monkeypatches various node APIs of newer versions of node and related packages to be compatible with code written and tested for 0.10.x.

This may not always be possible and this package is far from complete. These solutions are hacks although they have been tested in use.

For heaven's sake, don't start a new project today and require this module. We have published it to help others who have a significant amount of 0.10.x code that requires maintenance.

No, we are not writing code that relies on these APIs today!

## Changelog

0.1.3: must not assume that `console.error` has been given a string. Thanks to Michael Kopinsky.
