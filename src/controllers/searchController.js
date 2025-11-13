const mockProducts = [
  { id: 1, name: 'Chân váy minnie', price: 120000, image: '/images/Chan_vay_minnie.jpg' },
  { id: 2, name: 'Chân váy da', price: 200000, image: '/images/cv2.jpg' },
  { id: 3, name: 'Chân váy bí', price: 124000, image: '/images/cv3.jpg' },
  { id: 4, name: 'Chân váy dolly trắng', price: 100000, image: '/images/cv4.jpg' },
  { id: 5, name: 'Chân váy grace', price: 200000, image: '/images/cv5.jpg' },
  { id: 6, name: 'Chân váy dolly xanh', price: 165000, image: '/images/cv6.jpg' },
];

exports.getSearchResult = (req, res) => {
  const q = (req.query.q || '').trim(); 
  let products = mockProducts;

  if (q) {
    products = products.filter(p => 
      p.name.toLowerCase().includes(q.toLowerCase())
    );
  }

  res.render('user/searchResult', {
    layout: './layouts/userMaster',
    title: `Tìm kiếm: ${q || 'Tất cả'} - VPQ Studio`,
    
    isSearch: true,
    searchQuery: q,        
    products: products,    
    
    breadcrumbs: [
      { text: 'Trang chủ', link: '/' },
      { text: 'Tìm kiếm', link: '/search' }
    ]
  });
};
