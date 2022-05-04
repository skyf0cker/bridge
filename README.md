<h1 align="center">Welcome to bridge 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/bridge" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/bridge.svg">
  </a>
  <a href="https://github.com/skyf0cker/bridge/blob/master/LICENSE" target="_blank">
    <img alt="License: Apache License 2.0" src="https://img.shields.io/badge/License-Apache License 2.0-yellow.svg" />
  </a>
  <a href="https://twitter.com/vophanlee" target="_blank">
    <img alt="Twitter: vophanlee" src="https://img.shields.io/twitter/follow/vophanlee.svg?style=social" />
  </a>
</p>

> bridge from web2 to web3 for dev.to users. 

### 🏠 [Homepage](https://github.com/skyf0cker/bridge)

## Introduction
bridge can get dev.to users' articles and let them deploy their articles to the permanent storage provided by Arweave so that they can make their artices be permanently hosted in blockchain and no one can change them, delete them, and let them can not be accessed.

The frontend is built by using vue3 and ant-design-vue. The backend is built by Appwrite which is a self-hosted backend-as-a-service platform that gives developers all the APIs required to build any application.

[bridge-appwrite](https://github.com/skyf0cker/bridge-appwrite)

permanent storage is provided by [arweave](https://www.arweave.org/) team. Deploying articles to arweave needs an arweave wallet.
Bridge now only support [Arconnect](https://www.arconnect.io/) wallet.

*notice: this project is done during the dev.to x appwrite hackathon and i don't have enough time to tidy the code and perfect the details. If you are interested in this project, feel free to hit me up: issue, twitter DM, email are all welcomed*

## implement
- connect arconnect wallet
- verify dev.to user identify 
- get user posts, article detail through forem api
- sync the post to arweave network and view them in viewblock.

## not implement 
- other arweave wallet support like keyfile and aweave.app.
- pst token support: user syncing or polishing the articles through bridge can get the $BRIDGE pst token and the $AR token from sponsor. The balance and income will show on the dashboard page which is not implement now
- explore: people can explore to discover more articles posted by other people. This can use arweave gateway graphql to query them.
- refactor the code and optimize the backend api.

## How to use
### Install

```sh
yarn install
```

### develop

```sh
yarn dev
```

## Author

👤 **vophanlee**

* Website: vophan.dev
* Twitter: [@vophanlee](https://twitter.com/vophanlee)
* Github: [@skyf0cker](https://github.com/skyf0cker)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/skyf0cker/bridge/issues). 

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2022 [vophanlee](https://github.com/skyf0cker).<br />
This project is [Apache License 2.0](https://github.com/skyf0cker/bridge/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_