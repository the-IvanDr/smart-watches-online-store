import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

export default function ProductDescription() {
    const [isDescriptionMenuActive, setDescriptionMenuActive] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isDescriptionMenuActive ? 'hidden' : 'auto';
    }, [isDescriptionMenuActive]);




    return (
        <>
            <div className='ProductProfile__description -short'>
                <h4 className='ProductProfile__description__title'>Описание</h4>

                <h4 className='ProductProfile__description__title'>Спортивные часы Xiaomi Amazfit Verge</h4>
                <p>Xiaomi Amazfit Verge – умные часы, которые получили 11 спортивных режимов. С ними вам не придется доставать телефон, чтобы посмотреть уведомления, воспользоваться картой или принять телефонный звонок.</p>
                <button
                    className='ProductProfile__description__open-full-btn'
                    onClick={() => setDescriptionMenuActive(true)}
                >
                    Читать полностью
                </button>
            </div>

            <div className={clsx('ProductProfile__description', isDescriptionMenuActive && 'active')}>
                <h4 className='ProductProfile__description__section-title'>
                    Описание
                    <button
                        className='ProductProfile__description__close-modal-btn'
                        onClick={() => setDescriptionMenuActive(false)}
                    >
                        ✖
                    </button>
                </h4>
                <div className='ProductProfile__description__main-wrapper'>
                
                    <h4 className='ProductProfile__description__title'>Спортивные часы Xiaomi Amazfit Verge</h4>
                    <p>Xiaomi Amazfit Verge – умные часы, которые получили 11 спортивных режимов. С ними вам не придется доставать телефон, чтобы посмотреть уведомления, воспользоваться картой или принять телефонный звонок.</p>

                    <h3>Особенности:</h3>
                    <ul>
                        <li>Сенсорный 1.3” AMOLED дисплей</li>
                        <li>11 спортивных режимов</li>
                        <li>Датчик геопозиционирования GPS</li>
                        <li>Защита от пыли и влаги (плавание и душ не рекомендованы)</li>
                        <li>Закаленное стекло Corning Gorilla 3</li>
                        <li>До 5-ти дней автономной работы</li>
                        <li>Вес – 46 граммов</li>
                    </ul>

                    <img src='/assets/images/article/description-1.webp' alt='descr' />

                    <h4 className='ProductProfile__description__title'>Информативный дисплей</h4>
                    <p>Для работы со встроенными приложениями, управления камерой вашего смартфона и просмотра уведомлений Xiaomi Amazfit Verge получили энергоэффективный сенсорный 1.3” AMOLED дисплей. Данная технология делает информацию читабельной даже на ярком солнце и позволяет часам работать автономно до 5-ти дней. Разрешение экрана 360 х 360 пикселей.</p>

                    <h4 className='ProductProfile__description__title'>Производительная начинка</h4>
                    <p>Аксессуар работает под управлением фирменной AMAZFIT OS, созданной на базе Android. Для быстрой работы девайс получил  двухъядерный процессор с частотой 1,2 ГГц, 512 Мб оперативной памяти и 4 гигабайта внутренней памяти. Связь с другими мобильными устройствами и интернетом обеспечивает технология Bluetooth 4.0 LE.</p>

                    <img src='/assets/images/article/description-2.webp' alt='descr' />

                    <h4 className='ProductProfile__description__title'>На страже здоровья</h4>
                    <p>Спортивные часы получили набор датчиков для контроля физического состояния и активности. Пульсометр позволяет отслеживать ваш сердечный ритм, как в состоянии спокойствия, так и под нагрузкой. Шагомер считает пройденное расстояние, чтобы вы смогли понять, получаете ли достаточно физической активности.</p>

                    <img src='/assets/images/article/description-3.webp' alt='descr' />
                    <img src='/assets/images/article/description-4.webp' alt='descr' />

                    <h4 className='ProductProfile__description__title'>Спортивные режимы</h4>
                    <p>При разработке Amazfit Verge производитель ориентировался на потребности профессиональных спортсменов и тех, кто просто ведет здоровый образ жизни. Часы получили 11 спортивных режимов, среди которых ходьба, скалолазание, теннис, катание на лыжах, футбол, езда на велосипеде, эллиптические тренировки и другие. В меню каждого из видов спорта доступны специфические для него настройки. К примеру, в режиме бега можно загрузить маршрут для пробежки.</p>
                    <img src='/assets/images/article/description-5.webp' alt='descr' />

                    <h4 className='ProductProfile__description__title'>Ориентация в пространстве</h4>
                    <p>Любите ходить в походы или путешествовать, открывая для себя новые страны и города? Спортивные часы будут как раз кстати. Для позиционирования в пространстве девайс получил датчик GPS. С его помощью можно увидеть свое местонахождение в приложении с картами, что позволит продолжить маршрут в нужном направлении.</p>
                    <img src='/assets/images/article/description-6.webp' alt='descr' />

                    <h4 className='ProductProfile__description__title'>Спортивный стиль</h4>
                    <p>Часы выполнены в минималистичном круглом корпусе с оранжевыми деталями, который придется по вкусу почитателям спортивного стиля. Также их дизайн удачно впишется и в повседневный стиль. Эластичный ремешок Amazfit Verge создан для активного времяпрепровождения. При этом его можно снять и заменить на другой, преобразив таким образом ваш аксессуар.</p>
                    <img src='/assets/images/article/description-8.webp' alt='descr' />

                    <h4 className='ProductProfile__description__title'>Защищенный девайс</h4>
                    <p>Этот аксессуар готов пройти с вами любые испытания. Производителем предусмотрена защита от пыли и влаги. С ними можно не бояться попасть под небольшой дождь, да и пот во время тренировки не повредит устройство. При этом принимать с часами душ или плавать производитель не рекомендует. Закаленное стекло Corning Gorilla 3 защищает дисплей от случайных ударов и царапин.</p>
                </div>
            </div>
        </>
    )
}