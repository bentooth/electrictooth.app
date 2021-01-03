const dbConnection = require('../services/database');

async function addToCart(req, res) {
  const user = req.user;
  const type = req.body.type;
  const id = req.body.id;
  let cart;

  switch (type) {
    case 'track':
      cart = await addTrackToCart(id, user);
      break;
    // case 'album':
    //   cart = await addAlbumToCart(productId, user);
    //   break;
    // case 'coin':
    //   cart = await addCoinToCart(productId, user);
    //   break;
  }

  res.status(200).json(cart);
}

async function addTrackToCart(id, user) {
  const track = await dbConnection.getTrackById(id);
  const hasCart = await dbConnection.getUserCart(user._id);

  let userCart;

  if (!hasCart) {
    userCart = await dbConnection.createUserCart(user._id);
  } else {
    userCart = hasCart;
  }

  const inCart = userCart.items.some((i) => i._id === track._id);

  if (inCart) {
    return userCart;
  }

  const newCart = { items: [], total: 0 };

  newCart.items.push(...currentCart.items);

  newCart.items.push({
    id: song._id,
    artist_name: song.artist_name,
    product_id: song.product_id,
    song_name: song.song_name,
    price: song.price,
    img_url: song.img_url,
    type: song.type,
    quantity: song.quantity,
  });

  newCart.total = currentCart.total + song.price;

  const { cart } = await dbConnection.updateCart(user, newCart);

  return cart;
}

// async function addAlbumToCart(productId, user) {
//   const album = await dbConnection.getAlbumByProductId(productId);
//   const currentCart = user.cart;

//   const inCart = currentCart.items.some((i) => i.product_id === album.product_id);

//   if (inCart) {
//     return currentCart;
//   }

//   const newCart = { items: [], total: 0 };

//   newCart.items.push(...currentCart.items);

//   newCart.items.push({
//     id: album._id,
//     artist_name: album.artist_name,
//     product_id: album.product_id,
//     album_name: album.album_name,
//     price: album.price,
//     img_url: album.img_url,
//     type: album.type,
//     quantity: album.quantity,
//   });

//   newCart.total = currentCart.total + album.price;

//   const { cart } = await dbConnection.updateCart(user, newCart);

//   return cart;
// }

// async function addCoinToCart(productId, user) {
//   const coin = await dbConnection.getCoinByProductId(productId);
//   const currentCart = user.cart;

//   const inCart = currentCart.items.some((i) => i.product_id === coin.product_id);

//   if (inCart) {
//     return currentCart;
//   }

//   const newCart = { items: [], total: 0 };

//   newCart.items.push(...currentCart.items);

//   newCart.items.push({
//     id: coin._id,
//     product_id: coin.product_id,
//     img_url: coin.img_url,
//     price: coin.price,
//     type: coin.type,
//     quantity: coin.quantity,
//   });

//   newCart.total = currentCart.total + coin.price;

//   const { cart } = await dbConnection.updateCart(user, newCart);

//   return cart;
// }

function getUser(req, res) {
  res.status(200).json(req.user);
}

module.exports = {
  getUser,
  addToCart,
};