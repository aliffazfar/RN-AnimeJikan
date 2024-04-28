<br />

<p align="center">
  <h1 align="center">React Native Anime Catalog</h1>

  <p align="center">
    Implements the Anime Catalog using [Jikan API](https://docs.api.jikan.moe/) 
    <br />
  </p>
</p>


## Features

This project mainly focuses on the latest libraries and performance optimization by using [MMKV](https://github.com/mrousavy/react-native-mmkv) storage for Redux persist store, [React Query v5](https://react-query.tanstack.com/) + [Ky](https://github.com/sindresorhus/ky) for data fetching and caching, utilizing [useInfiniteQuery](https://react-query.tanstack.com/reference/useInfiniteQuery) (v5) for pagination (**infinite scroll**), [React Navigation](https://reactnavigation.org/) (stack, drawer, bottom tabs), [Flashlist](https://shopify.github.io/flash-list/) for Fast & Performant React Native List and [FastImage](https://github.com/DylanVann/react-native-fast-image) for image caching.

- **Browse Anime Catalog:** View anime catalog for airing, complete, and upcoming series.
- **View Anime Details:** Access detailed information about each anime and mark favorites.
- **Favorites Management:** Organize your favorite anime, view details, and remove favorites.

Download Apk: [AnimeCatalog.apk](https://drive.google.com/file/d/1zQP7qa0Atvcx24NNXpWLtCOQ1m-cxdyJ/view?usp=sharing)

## Examples

Home screens:




https://github.com/aliffazfar/rn-AnimeJikan/assets/97839622/657e8e54-203d-486c-bf47-e2cf969f431d





Favorites screens:


https://github.com/aliffazfar/rn-AnimeJikan/assets/97839622/e35fc751-c91f-4643-88ba-9a4ade3e63fd



## Prerequisites

Before running the project, make sure you have the following:

- Node.js installed on your machine
- React Native CLI installed globally

## Getting Started

To get started with the project, follow these steps:

Clone the repository:
git clone https://github.com/aliffazfar/rn-AnimeJikan.git

1. Install dependencies:

   - cd rn-AnimeJikan
   - yarn

2. yarn ios | yarn android

3. (*) Debug JS Remotely by [react-native-devsettings](https://github.com/gusgard/react-native-devsettings)

Generate APK: yarn build:android:apkRelease <br />
Output apk location: rn-AnimeJikan/android/app/build/outputs/apk/release/app-release.apk

## Folder Structure 

The project follows the following folder structure:

- src/components: Contains reusable components used in the project.
- src/hooks: Contains custom hooks.
- src/navigators: Contains navigation utilities.
- src/redux: Contains Redux slices for fetching and managing data.
- src/screens: Contains the main screens of the application.
- src/services: Contains the API service config and endpoints.
- src/types: Contains TypeScript type declarations for the project.


## Contact
For any inquiries or questions, please contact aliffazfararis@gmail.com.
