# easy
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Straightforward library for building domain-driven microservice architectures, implementing a simple evolutionary architecture. This library is distilled from projects where the teams I've worked with built platforms based on a simple, common architecture where each service centers around a small part of the platform domain.

This library will include best practices to support building services, such as:

* Nicely separated into four single-purpose layers, services, process, domain, data.
* Each layer contains single-purpose layer supertype classes.
* In the data layer we use gateways - either to a database, or to other services.
* In the domain layer there are supertypes to model the domain, such as entities, records, value objects and enumerations.
* The domain layer also knows the repository layer supertype, for handling instances of entities and structs.
* The process layer contains use cases, that model your process.
* The services layer has resource as the layer supertype, to model the API exposed.
* Additionally, this library contains utility classes for standardizing e.g. uri's, and ids, constructors, lists, queries, and errors.
* This library will contain a simple validation mechanism, using decorators.

We keep this library simple on purpose, extending it using additional libraries and frameworks should be possible simply by embedding their API's.

Likely we will use jest for unit testing, wrap axios for request handling, and a simple mongodb connector, and wrap tsyringe for dependency injection.
