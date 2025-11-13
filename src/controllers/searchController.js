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
