'use strict';

const { hashPassword } = require('../helpers/bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = [
      {
        name: 'Dewasa',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kids',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Women',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sports',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Brands',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Outlet',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Best of Adidas',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "hot's",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const products = [
      {
        name: 'Air Jordan 6 Retro',
        slug: 'Air-Jordan-6-Retro',
        description:
          "MJ's sixth signature shoe debuted during the 1990-1991 season as His Airness battled rivals in pursuit of an elusive first championship. Now, it's back in a variety of color schemes. Gear up for the 30th anniversary of the Air Jordan 6 with this timeless classic.",
        price: 2000000,
        mongoId: '63f97b22aef75d30b2cd4ae2',
        mainImg:
          'https://www.adidas.co.id/media/catalog/product/h/p/hp2986_2_footwear_photography_side_lateral_view_grey.jpg',
        categoryId: 1,
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Air Jordan 1 Utility',
        slug: 'Air-Jordan-1-Utility',
        mongoId: '63f97b22aef75d30b2cd4ae2',
        description:
          'Utilitarian, but make it edgy: these AJ1s give you functional use without compromising that style you know and love. Tough canvas, stash pockets and webbing pulls give these classic kicks a hit of rugged versatility.',
        price: 17000000,
        mainImg:
          'https://www.adidas.co.id/media/catalog/product/h/r/hr1238_2_footwear_photography_side20lateral20view_grey.jpg',
        categoryId: 2,
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Air Jordan 7 Retro',
        slug: 'Air-Jor-dan-7-Retro',
        mongoId: '63f97b22aef75d30b2cd4ae2',
        description:
          "Inspired by the shoe originally worn by MJ during the '92 season and summer of basketball, the Air Jordan 7 Retro revives its championship legacy for a new generation of sneakerheads.",
        price: 200000000,
        mainImg:
          'https://www.adidas.co.id/media/catalog/product/i/f/if9951_2_footwear_photography_side20lateral20view_grey.jpg',
        categoryId: 2,
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Air Jordan 8 Retro',
        slug: 'Air-Jordan-8-Retro',
        mongoId: '63f97b22aef75d30b2cd4ae2',
        description:
          "Inspired by the shoe originally worn by MJ during the '92 season and summer of basketball, the Air Jordan 7 Retro revives its championship legacy for a new generation of sneakerheads.",
        price: 2000000000,
        mainImg:
          'https://www.adidas.co.id/media/catalog/product/g/z/gz9794_2_footwear_photography_side20lateral20view_grey.jpg',
        categoryId: 2,
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const images = [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 1,
        imgUrl:
          'https://www.adidas.co.id/media/catalog/product/h/p/hp2986_1_footwear_photography_side_lateral_center_view_grey.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 1,
        imgUrl:
          'https://www.adidas.co.id/media/catalog/product/h/p/hp2986_5_footwear_photography_side_medial_center_view_grey.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 1,
        imgUrl:
          'https://www.adidas.co.id/media/catalog/product/h/p/hp2986_6_footwear_photography_front_lateral_top_view_grey.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 1,
        imgUrl:
          'https://www.adidas.co.id/media/catalog/product/h/p/hp2986_7_footwear_photography_back_lateral_top_view_grey.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 2,
        imgUrl:
          'https://www.adidas.co.id/media/catalog/product/h/r/hr1238_5_footwear_photography_side20medial20center20view_grey.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 2,
        imgUrl:
          'https://www.adidas.co.id/media/catalog/product/h/r/hr1238_3_footwear_photography_top20portrait20view_grey.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 2,
        imgUrl:
          'https://www.adidas.co.id/media/catalog/product/h/r/hr1238_6_footwear_photography_front20lateral20top20view_grey.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 2,
        imgUrl:
          'https://www.adidas.co.id/media/catalog/product/h/r/hr1238_7_footwear_photography_back20lateral20top20view_grey.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 3,
        imgUrl:
          'https://www.adidas.co.id/media/catalog/product/i/f/if9951_5_footwear_photography_side20medial20center20view_grey.jpg',
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 3,
        imgUrl:
          'https://www.adidas.co.id/media/catalog/product/i/f/if9951_3_footwear_photography_top20portrait20view_grey.jpg',
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 3,
        imgUrl:
          'https://www.adidas.co.id/media/catalog/product/i/f/if9951_6_footwear_photography_front20lateral20top20view_grey.jpg',
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 3,
        imgUrl:
          'https://www.adidas.co.id/media/catalog/product/i/f/if9951_7_footwear_photography_back20lateral20top20view_grey.jpg',
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 4,
        imgUrl:
          'https://www.adidas.co.id/media/catalog/product/g/z/gz9794_3_footwear_photography_top20portrait20view_grey.jpg',
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 4,
        imgUrl:
          'https://www.adidas.co.id/media/catalog/product/g/z/gz9794_6_footwear_photography_front20lateral20top20view_grey.jpg',
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 4,
        imgUrl:
          'https://www.adidas.co.id/media/catalog/product/g/z/gz9794_7_footwear_photography_back20lateral20top20view_grey.jpg',
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: 4,
        imgUrl:
          'https://www.adidas.co.id/media/catalog/product/g/z/gz9794_5_footwear_photography_side20medial20center20view_grey.jpg',
      },
    ];
    await queryInterface.bulkInsert('Categories', categories, {});
    await queryInterface.bulkInsert('Products', products, {});
    await queryInterface.bulkInsert('Images', images, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Images', null, {});
  },
};
