
console.log('....ss', $('.a'))
$(document).ready(function(){
    $('.a').css('color', '#ff0000')

    $('#dg').datagrid({
        url:'datagrid_data.json',
        columns:[[
            {field:'code',title:'代码',width:100},
            {field:'name',title:'名称',width:100},
            {field:'price',title:'价格',width:100,align:'right'}
        ]]
    });

    $('#dg').datagrid('loadData',[{
            code: '1123',
            name: 'C++',
            price: '$100'
        },
        {
            code: '11223',
            name: 'C++',
            price: '$100'
        },
    ])
})
