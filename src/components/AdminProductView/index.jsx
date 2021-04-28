import React from 'react';
import { ProductActions } from '../../redux/actions/adminActions';
import { useSelector, useDispatch } from 'react-redux';

import { AdminPannelField, AdminPannelViewItem, AdminPannelViewWrapper, Button, RedButton, ReturnButton } from '../AdminPannel';


export default function AdminProductView() {

    const jwt = useSelector(state => state.auth.authData.token);
    const product = useSelector(state => state.admin.products.list.find(item => item.id === state.admin.products.view));
    const dispatch = useDispatch();


    const returnHandler = () => {
        dispatch(ProductActions.openList());
    }

    const editHandler = () => {
        console.log('edit');
    }

    const removeHandler = () => {
        console.log('delete', product.id);
        // dispatch(ProductActions.delete(jwt, brand.id));
    }


    const pretifyHtmlString = (str) => {
        const format = (node, level) => {
            let indentBefore = new Array(level++ + 1).join('  '),
                indentAfter = new Array(level - 1).join('  '),
                textNode;

            for (var i = 0; i < node.children.length; i++) {

                textNode = document.createTextNode('\n' + indentBefore);
                node.insertBefore(textNode, node.children[i]);

                format(node.children[i], level);

                if (node.lastElementChild == node.children[i]) {
                    textNode = document.createTextNode('\n' + indentAfter);
                    node.appendChild(textNode);
                }
            }

            return node;
        }

        const div = document.createElement('div');
        div.innerHTML = str.trim();

        return format(div, 0).innerHTML;
    }




    return (
        <div className='AdminProductView'>
            <AdminPannelField>
                <ReturnButton onClick={returnHandler} />
                <Button title='Редактировать' onClick={editHandler} />
                <RedButton title='Удалить' onClick={removeHandler} />
            </AdminPannelField>
            <AdminPannelField title='Бренд'>
                <AdminPannelViewWrapper>
                    <AdminPannelViewItem title='Изображение' imgSrc={product.imageSrc} />
                    <AdminPannelViewItem title='ID' value={product.id} />
                    <AdminPannelViewItem title='Артикул' value={product.article} />
                    <AdminPannelViewItem title='Название' value={product.name} />
                    <AdminPannelViewItem title='Цена' value={product.price} />
                    <AdminPannelViewItem title='Скидка' value={product.discount} />
                    <AdminPannelViewItem title='Хит' value={product.is_hit ? 'Да' : 'Нет'} />
                    <AdminPannelViewItem title='Новинка' value={product.is_novelty ? 'Да' : 'Нет'} />
                    <AdminPannelViewItem title='Характер' value={
                        (product.is_for_man && product.is_for_woman && 'Унисекс')
                        || (product.is_for_man && 'Мужской')
                        || (product.is_for_woman && 'Женский')
                        || (product.is_for_kids && 'Детский')
                    } />
                    <AdminPannelViewItem title='Описание' value={<pre style={{ fontSize: 15 }}>{pretifyHtmlString(product.description)}</pre>} />
                    <AdminPannelViewItem title='Дата создания' value={new Date(product.createdAt).toLocaleString()} />
                    <AdminPannelViewItem title='Дата последнего редактирования' value={new Date(product.updatedAt).toLocaleString()} />
                </AdminPannelViewWrapper>
            </AdminPannelField>
        </div>
    )
}

//&nbsp;