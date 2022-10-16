Trackr
==================

Track Items using the Blockchain


Quick Start
===========

If you haven't installed dependencies during setup:

    npm install


Build and deploy your contract to TestNet with a temporary dev account:

    npm run deploy

Run `npm start`. This will run a dev server.


## Inspiration
- After learning about NEAR's immutable smart contracts for data and protection, we decided to find a practical solution. To make tracking more transparent and secure for the general public.

## What it does
- Trackr has the functionality to read the smart contract’s metadata which offers ease of accessibility through the use of a QR code or ID search. 

## How we built it

- Used Javascript, Typescript, Bootstrap, and React to construct the User Interface.
- We used NEAR's blockchain to store data and constructed all backend infrastructure using smart contracts.

## Challenges we ran into
- To implement blockchain smart contracts for the first time and keep efficiency a priority.
- We all had never used React before, so we had to learn and adjust. 

## Accomplishments that we're proud of

- Implementing NEAR’s API library to securely store item metadata through each smart contract and exposing that data for the user.
- Facilitate searching IDs through the use of a QR code to fetch data quickly.


## What we learned
- Interface with the NEAR protocol using the near-api-js library.
- Create a functional, mobile-friendly web app using React.

## What's next for Trackr
- Implement different metadata options and searching options for different items.


Troubleshooting
===============

On Windows, if you're seeing an error containing `EPERM` it may be related to spaces in your path. Please see [this issue](https://github.com/zkat/npx/issues/209) for more details.


  [create-near-app]: https://github.com/near/create-near-app
  [Node.js]: https://nodejs.org/en/download/package-manager/
  [jest]: https://jestjs.io/
  [NEAR accounts]: https://docs.near.org/concepts/basics/account
  [NEAR Wallet]: https://wallet.testnet.near.org/
  [near-cli]: https://github.com/near/near-cli
  [gh-pages]: https://github.com/tschaub/gh-pages
