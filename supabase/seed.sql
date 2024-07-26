
insert into public.common ("videoLink", year, title, text, seo, "pageLinks", copyright, description, banner, iframe, "bannerMode")
values
(
    NULL,
    2024,
    '{"en":"A networked community","ru":"Сетевое сообщество"}',
    '{"en":"<p class=\"p1\"><s><strong>Artists</strong></s>, whose <em>brushes</em> embody celestial melodies on canvases, dance with colors in the rhythm of galactic symphonies. Their palettes shine like X-rays, penetrating the universe of emotions and sensations. The boundaries between reality and fantasy dissolve in whirlwinds of color, where blue cats whisper secrets of time, and green birds sing of love and loss. Each brushstroke is a star, each painting is a universe. Artists are magicians of color and shamans of imagery, guiding us through the labyrinths of visual fantasies.</p><hr><p class=\"p1\">Their studios are temples of inspiration, where the walls breathe creativity, and the air is filled with the aroma of fresh paint and mysterious ideas. A brushstroke, like a magical wand, brings the canvas to life, turning it into a portal to other worlds. In this space, anything is possible: ships sail in the sky, trees whisper tales of ancient civilizations, and light and shadow play hide and seek, creating multi-layered narratives. Artists, like alchemists, transform the ordinary into the extraordinary, giving viewers the opportunity to see the world through the prism of their unique visions.</p>", "ru":"<p dir=\"\\&quot;ltr\\&quot;\"><strong>Художники</strong>, чьи <em>кисти</em> воплощают небесные мелодии на холстах, танцуют с красками в ритме галактических симфоний. Их палитры сияют, как рентгеновские лучи, пронизывая вселенную эмоций и ощущений. Границы между реальностью и фантазией растворяются в цветовых вихрях, где синие коты шепчут о секретах времени, а зелёные птицы поют о любви и потерях. Каждый мазок - это звезда, каждое полотно - вселенная. Художники, они ведь маги красок и шаманы образов, ведущие нас через лабиринты визуальных фантазий.</p><hr><p dir=\"\\&quot;ltr\\&quot;\">Их студии &mdash; это храмы вдохновения, где стены <strong>дышат</strong> творчеством, а воздух насыщен ароматом свежих красок и загадочных идей. Взмах кисти, словно магический жезл, оживляет холст, превращая его в портал к иным мирам. В этом пространстве возможно всё: корабли парят в небе, деревья шепчут истории древних цивилизаций, а свет и тень играют в прятки, создавая многослойные повествования. Художники, подобно алхимикам, превращают обычное в экстраординарное, даря зрителям возможность видеть мир через призму своих уникальных видений.</p>"}',
    '{"title":"","keyword":"","description":""}',
    '[{"link":"https://youtube.com/","name":{"en":"YouTube","ru":"YouTube"}},{"link":"https://t.me/nana","name":{"en":"Telegram","ru":"Телеграм"}},{"link":"mailto:effectnaruto@haha.com","name":{"en":"Participate","ru":"Принять участие"}}]',
    '{"en":"All material on the site is the intellectual property of Naruto Effect members and may only be used with prior approval","ru":"Все размещенные на сайте nматериалы – интеллектуальная собственность участников Эффекта Наруто и nможет быть использована только с предварительным согласованием"}',
    '{"en":"","ru":""}',
    '{"alt":"","link":""}',
    NULL,
    'image'
);

insert into public.cv (title, text)
values
(
    '{"en":"Curriculum vitae","ru":"Curriculum vitae"}',
    '{"en":"<p class=\"p1\"><strong>First Paragraph:</strong></p>\n<p class=\"p1\">Artists, whose brushes embody celestial melodies on canvases, dance with colors in the rhythm of galactic symphonies. Their palettes shine like X-rays, penetrating the universe of emotions and sensations. The boundaries between reality and fantasy dissolve in whirlwinds of color, where blue cats whisper secrets of time, and green birds sing of love and loss. Each brushstroke is a star, each painting is a universe. Artists are magicians of color and shamans of imagery, guiding us through the labyrinths of visual fantasies.</p>\n<p class=\"p2\">&nbsp;</p>\n<p class=\"p1\"><strong>Second Paragraph:</strong></p>\n<p class=\"p1\">Their studios are temples of inspiration, where the walls breathe creativity, and the air is filled with the aroma of fresh paint and mysterious ideas. A brushstroke, like a magical wand, brings the canvas to life, turning it into a portal to other worlds. In this space, anything is possible: ships sail in the sky, trees whisper tales of ancient civilizations, and light and shadow play hide and seek, creating multi-layered narratives. Artists, like alchemists, transform the ordinary into the extraordinary, giving viewers the opportunity to see the world through the prism of their unique visions.</p>", "ru":"<section>\n<p class=\"p1\">Художники, чьи кисти воплощают небесные мелодии на холстах, танцуют с красками в ритме галактических симфоний. Их палитры сияют, как рентгеновские лучи, пронизывая вселенную эмоций и ощущений. Границы между реальностью и фантазией растворяются в цветовых вихрях, где синие коты шепчут о секретах времени, а зелёные птицы поют о любви и потерях. Каждый мазок - это звезда, каждое полотно - вселенная. Художники, они ведь маги красок и шаманы образов, ведущие нас через лабиринты визуальных фантазий.</p>\n<p class=\"p1\">Их студии &mdash; это храмы вдохновения, где стены дышат творчеством, а воздух насыщен ароматом свежих красок и загадочных идей. Взмах кисти, словно магический жезл, оживляет холст, превращая его в портал к иным мирам. В этом пространстве возможно всё: корабли парят в небе, деревья шепчут истории древних цивилизаций, а свет и тень играют в прятки, создавая многослойные повествования. Художники, подобно алхимикам, превращают обычное в экстраординарное, даря зрителям возможность видеть мир через призму своих уникальных видений.</p>\n</section>"}'
);

insert into public.hat (name, password, "isPutting", words)
values
(
    'тест',
    NULL,
    false,
    ARRAY['test']
);

insert into public.participants ("isVisible", slug, name, title, description)
values
(
    true,
    'ada-quirkbane',
    '{"en":"Ada Quirkbane","ru":"Ада Квиркбейн"}',
    '{"en":"an eccentric inventor creating unusual and whimsical gadgets that often seem magical. Her inventions range from automatic teapots to small robotic helpers","ru":"эксцентричная изобретательница, создающая необычные и причудливые механизмы, которые порой кажутся магическими. Её изобретения варьируются от автоматических чайников до маленьких роботов-помощников."}',
    '{"en":"<p class=\"p1\">an eccentric inventor creating unusual and whimsical gadgets that often seem magical. Her inventions range from automatic teapots to small robotic helpers.</p>","ru":"<p class=\"p1\">эксцентричная изобретательница, создающая необычные и причудливые механизмы, которые порой кажутся магическими. Её изобретения варьируются от автоматических чайников до маленьких роботов-помощников.</p>"}'
),
(
    false,
    'maxwell-starwatcher',
    '{"en":"Maxwell Starwatcher","ru":"Максвелл Звездозор"}',
    '{"en":"an astronomer and space explorer who designs unusual telescopes and instruments for observing stars. His discoveries help humanity better understand the universe","ru":"астроном и исследователь космоса, который разрабатывает необычные телескопы и приборы для наблюдения за звездами. Его открытия помогают человечеству лучше понимать вселенную"}',
    '{"en":"<p class=\"p1\">an astronomer and space explorer who designs unusual telescopes and instruments for observing stars. His discoveries help humanity better understand the universe.</p>","ru":"<p class=\"p1\">астроном и исследователь космоса, который разрабатывает необычные телескопы и приборы для наблюдения за звездами. Его открытия помогают человечеству лучше понимать вселенную</p>"}'
),
(
    false,
    'iris-zephyrwhisper',
    '{"en":"Iris Zephyrwhisper","ru":"Айрис Зефирвишер"}',
    '{"en":"a mysterious naturalist studying rare and mythical plants. She travels the world in search of new species and writes books about her discoveries, which become bestsellers among nature and botany enthusiasts","ru":"загадочная натуралистка, изучающая редкие и мифические растения. Она путешествует по миру в поисках новых видов и пишет книги о своих находках, которые становятся бестселлерами среди любителей природы и ботаники"}',
    '{"en":"<p class=\"p1\">a mysterious naturalist studying rare and mythical plants. She travels the world in search of new species and writes books about her discoveries, which become bestsellers among nature and botany enthusiasts</p>","ru":"<p class=\"p1\">загадочная натуралистка, изучающая редкие и мифические растения. Она путешествует по миру в поисках новых видов и пишет книги о своих находках, которые становятся бестселлерами среди любителей природы и ботаники</p>"}'
),
(
    false,
    'eudora-fableweaver',
    '{"en":"Eudora Fableweaver","ru":""}',
    '{"en":"a talented writer and storyteller, creating amazing worlds and stories that capture the imagination. Her books and oral tales are full of magic, adventure, and deep philosophical reflections","ru":""}',
    '{"en":"<p class=\"p1\">a talented writer and storyteller, creating amazing worlds and stories that capture the imagination. Her books and oral tales are full of magic, adventure, and deep philosophical reflections</p>","ru":""}'
),
(
    true,
    'lukas-tenebrislav',
    '{"en":"","ru":"Лукас Тенебрислав"}',
    '{"en":"","ru":"загадочный художник, специализирующийся на картинах, которые изменяются в зависимости от освещения. Его работы считаются волшебными, ведь они способны передавать различные эмоции и истории в зависимости от времени суток"}',
    '{"en":"","ru":"<p class=\"p1\">загадочный художник, специализирующийся на картинах, которые изменяются в зависимости от освещения. Его работы считаются волшебными, ведь они способны передавать различные эмоции и истории в зависимости от времени суток</p>"}'
),
(
    true,
    'felix-grimoarsky',
    '{"en":"Felix Grimoarsky","ru":"Феликс Гримоарский"}',
    '{"en":"a scientist-alchemist who has dedicated his life to finding the Philosopher’s Stone and creating elixirs capable of curing any disease. His laboratory is filled with strange and ancient artifacts","ru":"учёный-алхимик, посвятивший свою жизнь поиску философского камня и созданию эликсиров, способных исцелять любые болезни. Его лаборатория полна странных и древних артефактов"}',
    '{"en":"<p class=\"p1\">a scientist-alchemist who has dedicated his life to finding the Philosopher’s Stone and creating elixirs capable of curing any disease. His laboratory is filled with strange and ancient artifacts</p>","ru":"<p class=\"p1\">учёный-алхимик, посвятивший свою жизнь поиску философского камня и созданию эликсиров, способных исцелять любые болезни. Его лаборатория полна странных и древних артефактов</p>"}'
);


insert into public.practices ("isVisible", slug, title, subtitle, description, banner, iframe, "bannerMode")
values
(
    false,
    '{"en":"walk","ru":"progulka"}',
    '{"en":"Walk","ru":"Прогулка"}',
    '{"en":"Stride Towards Your Dreams","ru":"Участники выходят на улицу, созваниваются по видеосвязи и идут на прогулку в том месте, где они находятся. Параллельно они могут делиться наблюдениями и ощущениями"}',
    '{"en":"Eng","ru":"Рус"}',
    '{"alt":null,"link":null}',
    NULL,
    'image'
),
(
    true,
    '{"en":"eating-cake","ru":"edim-tort"}',
    '{"en":"Eating cake","ru":"Едим торт"}',
    '{"en":"Delicacies from Another Dimension","ru":"Сладости из другого измерения"}',
    '{"en":"Eng","ru":"Рус"}',
    '{"alt":null,"link":null}',
    NULL,
    'image'
),
(
    true,
    '{"en":"eating-noodles","ru":"edim-lapshu"}',
    '{"en":"Eating noodles","ru":"Едим лапшу"}',
    '{"en":"Mastering the art of noodle consumption in daily life","ru":"Искусство употребления лапши в ежедневной жизни"}',
    '{"en":"Eng","ru":"Рус"}',
    '{"alt":null,"link":null}',
    NULL,
    'video'
);
