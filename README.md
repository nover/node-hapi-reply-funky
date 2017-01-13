# Hapi stream reply handling

This repo was created to demonstrate a funky bug my team and I have experienced with Hapijs and handling of streams in the `reply` function

## Problem description

We noticed that passing a stream2 interface directly to hapi `reply` works just fine, however, when resolving a promise with said stream `reply`  behaves abnormally.
The usecase is calling a remote endpoint with the `request` module and streaming the remote endpoint http response to the caller of the HAPI api.

As shown in the test, we expected that:
 
 - Calling reply with a stream directly works
 - Passing a promise which resolves to a stream works
 - "doing something async" - in this case `setImmediate` and passing the response stream to reply would work

To this point, we only managed to get 1) working, the rest do not.
