# react_component_ar_vr

An example of React Component rendered using Aardvark with synchronized data driven by events using croquet as a backend.

Work in progress, still experimenting with react / aardvark.

## installation notes

```
npm i
```

you need to edit some of the provided typescript definitions by croquet as they are missing some functions / properties that are available edit `node_modules\@croquet\croquet\types.d.ts`
```
...
    export class Model extends PubSubParticipant {
        id: string;
        sessionId: string;  // added
        ...
        now(): number; // added
        ...

    }
...
```

there are also some things that need changing

origonal:
```
        subscribe(scope: string, eventSpec: string | {event: "string", handling: "queued" | "oncePerFrame" | "immediate"}, callback: (e: any) => void): void;
```
modified:
```
        subscribe(scope: string, eventSpec: string | {event: string, handling: "queued" | "oncePerFrame" | "immediate"}, callback: (e: any) => void): void;
```

notice the change to the event property.

after this is done then proceed with a

```
npm run start
```
and then a

```
avcmd install ./dist
```

You might want to change the simulationID constant / setting to not have other running simulations interfere with your development

## Known problems / workarounds

- there is a bug in aardvark that causes gadgets to crash if a grabbable is grabbed while the simulation chages the number of grabbables available. To work around this it's important that when you pull out the gadget, you drop it before state can sync with croquet. If things do crash, keep trying until this bug is resolved. The relevant issue can be found and tracked on the [aardvark](https://github.com/aardvarkxr/aardvark/issues/81) issues.

## Quick Overview / call outs of existing quirks.

- conditionalGrabbable is a component attempting to abstract away the swapping of grabbable with a basic transform
- ticTacToe component has the base logic that opens a connection to croquet on the given channel
- the scene is crude but base functionality is
  - yellow box: reset
  - red x = flag for destruction next move
  - circle / square spawn a peice. Once a piece is moved by someone no one else can move it.
- if your using this to test, change the session id to avoid everyone jumping into a shared session
- the board is positioned globally, this only makes sense if your vr space shares the same real world space, for other scenarios it's probably better to not share the board position.
- ownership and lease time is a workaround to help the conditional grabbable do the right thing to interact with aardvark
- the webpack config used in this project is different from the generated one through avcmd
- letting the client decide the spawn point of game objects is scary
- the viewID would be better injected as a separate parameter (not in the event data)