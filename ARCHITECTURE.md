# architectural design

ASTs allow you to deeply inspect and make sense of your source code. this is especially helpful when you have a microservices in a distributed system. right now, there's a gap for observability within microfrontends that aren't contained in a monorepo. standardization and maintainance require a level of visibility into applications that is hard to accomplish without colocated code. the mission of this tool is to explore and provide an initial set of tools to gain insight into microfrontends to do stuff like:

- push standards
  i'm imagining that a "platform" team might want to make sure people are using a consistent version of a package, not letting teams lag too far behind causing friction. what should be routine-ish maintenance. another example that is a _very specific_ usecase to single-spa (microfrontends), you could make sure every app is using the same exact shared dependency version/only those available in an import map
- update library versions
  help pushing major version upgrades, and prevent version mismatches and library collisions.
- understand how consumers are using your microfrontend/application/utility module
  - imagine knowing how many dependents were using a specific api exported from your module. like, if an api had only one consumer it'd be a lot easier to migrate; just coordinate with the other team and you could ship that pretty quickly. but if that api had dozens of consumers, you would need a more careful and extended migration plan with deadlines, deprecations/warnings, and docs + tools to make it easy to update. this might sound a bit complicated but after a while it'd feel almost natural.
- share additional metadata about your applications to just keep an eye on things. stuff like bundle sizes, syntax updates, telemetry, releases, memes, etc. whatever might be relevant.

really though, this isn't limited to microfrontends/microservices but just general analysis of your source code. what you do with it is what makes it valuable.

## api planning

i'm going to develop this as a script that will:

- require configuration
  this defines what tools to use internally to analyze the code
  - ideally, this should use the same library that the consumer is using to compile their code. eg.
    - if TypeScript use `typescript` compiler
      - alternatively try babel + preset-typescript
    - if JavaScript use babel + preset-env
      - if React + jsx, add preset-react
    - if Svelte, use `svelte` compiler
  - the analyze step produces an AST
- require a single-file transform. eg. get data from a single file
  along with additionally expose:
  - tree-walk for direct use but not require
  - premade utils for common usecases
    - getPackageImports: get all specifiers of a package being used
    - getExports: get everything that a file is exported
    - getExternals:
    - getResolvedStarExports (noy yet implemented): if your package has a star export from another file, its difficult to really know what is available; this helper resolves them so that you can get an idea what the top level api actually is.
- require a reporting transform. eg. take individual file data and aggregate it.

that's sort of it.
