# Hapi stream reply handling

TL;DR It turned out to be a bug / issue in the `request` library. Calling `stream.pause` before performing async actions (callback, promise) fixes the issue
I'm keeping the repo aroud in case someone stumbles upon this issue and starts Googl'ing.


This repo was created to demonstrate a funky bug my team and I have experienced with Hapijs and handling of streams coming from the `request` library in the `reply` function.

## Problem description

We noticed that passing a stream2 interface directly to hapi `reply` works just fine, however, when resolving a promise with said stream `reply`  behaves abnormally.
The usecase is calling a remote endpoint with the `request` module and streaming the remote endpoint http response to the caller of the HAPI api.

As shown in the test, we expected that:
 
 - Calling reply with a stream directly works
 - Passing a promise which resolves to a stream works
 - "doing something async" - in this case `setImmediate` and passing the response stream to reply would work

To this point, we only managed to get 1) working, the rest do not.


## Problem fix

Calling `responseStream.pause()` on the stream returned from `request` on the `response.on('response')` event.
See commit: 76e4a7d6
