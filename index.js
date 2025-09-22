const { sequelize, Phone } = require('./models');
const { Op } = require('sequelize');

(async function () {
  // додавання нового телефону,

    const newPhone = {
      model: 'Galaxy Note 20',
      brand: 'Samsung',
      productYear: '2016-08-21',
      sizeRAM: 8,
      processor: 'Snapdragon',
      screenDiagonal: 6,
      isNFC: true,
    };

  // const createdPhone = await Phone.create(newPhone);

  // отримання списку телефонів

  const foundPhoneAll = await Phone.findAll({ raw: true });
    console.log(foundPhoneAll);

  // (* 3-я сторінка при перегляді по 4 телефони на сторінці, упорядкованих за роком виробництва),

    const foundPhoneOrder = await Phone.findAll({
      raw: true,
      order: ['productYear'],
      limit: 4,
      offset: 8,
    });

  //   console.log(foundPhoneOrder)

  // *отримання списку телефонів поточного року видання,

    const getPhoneCurrentYear = await Phone.findAll({
      raw: true,
      where: sequelize.where(
        sequelize.literal('EXTRACT(YEAR FROM "productYear")'),
        new Date().getFullYear()
      ),
    });

  // console.log(getPhoneCurrentYear)

  // *отримання списку телефонів старше 2023 року випуску,

  const getPhoneOlder2023 = await Phone.findAll({
    raw: true,
    where: {
      productYear: {
        [Op.lt]: '2023-01-01',
      },
    },
  });

  // console.log(getPhoneOlder2023);

  // оновлення: змінити розмір оперативної пам'яті телефону з id: 1,

  const updateSizeRAM = await Phone.update(
    { sizeRAM: 4 },
    { where: { id: 1 }, raw: true, returning: true }
  );

  // console.log(updateSizeRAM[1][0])

  // *оновлення: додати нфс всім телефонам 2024 року випуску,

  const updateNFC = await Phone.update(
    { isNFC: true },
    {
      where: {
        productYear: {
          [Op.gte]: '2024-01-01',
          [Op.lte]: '2024-12-31',
        },
      },
      raw: true,
      returning: true,
    }
  );

  // console.log(updateNFC[1][0]);

  // видалення телефону з id: 2.

    const deletedPhone = await Phone.destroy({ where: { id: 2 } });

  //   console.log(deletedPhone);

  // *видалення телефонів 2016 року випуску.

  const deletedPhone2016 = await Phone.destroy({
    where: {
      productYear: {
        [Op.gte]: '2016-01-01',
        [Op.lte]: '2016-12-31',
      },
    },
  });



  // **вивести середній розмір оперативної пам'яті телефонів

const sizeRAMavg = await Phone.findAll({
    attributes: [
      [sequelize.fn('AVG', sequelize.col('sizeRAM')), 'avgRAM']
    ],
    raw: true
  });


  // **вивести кількість телефонів кожної марки.

  const countByBrand = await Phone.findAll({
    attributes: [
        'brand',                         
        [sequelize.fn('COUNT', sequelize.col('brand')), 'count'] 
      ],
      group: ['brand'],      
    raw: true
  });

//   console.log(countByBrand)

  // **вивести бренди, у телефонів яких максимальна діагональ більше за 6.6

    const brands = await Phone.findAll({
      attributes: [
        'brand',
        [sequelize.fn('MAX', sequelize.col('screenDiagonal')), 'maxDiagonal']
      ],
      group: ['brand'],
      having: sequelize.literal('MAX("screenDiagonal") > 6.6'),
      raw: true
    });
  
    // console.log(brands);

})();
