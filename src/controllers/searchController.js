exports.getSearchResult = (req, res) => {
    res.render('user/searchResult', {layout: './layouts/userMaster',title: 'VPQ Studio - Tìm kiếm',  
        isSearch: true,                  
        searchQuery: '',                 
        products: []                     
    });
};
