import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

async function main() {
    await prisma.product.createMany({
        data: [
            // Manga (categoryId: 1)
            { name: 'Naruto Vol.1', price: 299, description: 'Dive into Naruto Uzumaki’s epic ninja journey in this action-packed first volume.', categoryId: 1, image: 'https://mrtns.sk/tovar/_l/213/l213325.jpg?v=17293105182', inStock: true },
            { name: 'One Piece Vol.5', price: 299, description: 'Join Luffy’s thrilling quest for the One Piece in this high-seas adventure.', categoryId: 1, image: 'https://m.media-amazon.com/images/I/81D4SPVL8iL._UF1000,1000_QL80_.jpg', inStock: false},
            { name: 'Attack on Titan Vol.3', price: 299, description: 'Experience intense battles against Titans in this gripping manga volume.', categoryId: 1, image: 'https://bookbins.b-cdn.net/wp-content/uploads/2024/04/Attack-On-Titan-3-Hajime-Isayama-Buy-Online-Bookbins-1.jpg', inStock: true },
            { name: 'Death Note Vol.1', price: 299, description: 'Follow Light Yagami’s dark descent with the Death Note in this suspenseful classic.', categoryId: 1, image: 'https://cdn.myshoptet.com/usr/www.nekonecno.sk/user/shop/big/48875_death-note-01.jpg?6644df83', inStock: true },
            { name: 'Jujutsu Kaisen Vol.2', price: 299, description: 'Unleash supernatural action with Yuji Itadori in this thrilling manga.', categoryId: 1, image: 'https://media.enbook.sk/media/catalog/product/cache/d8eb61fdf2d5f865c0964a0302378e50/9/7/9781974710034.jpg', inStock: true },
            { name: 'Bleach Vol.7', price: 299, description: 'Join Ichigo’s soul-reaping adventures in this action-packed Bleach volume.', categoryId: 1, image: 'https://www.japanzon.com/36141-product_hd/bleach-vol7-jump-comics-japanese-version.jpg', inStock: true },
            { name: 'Chainsaw Man Vol.4', price: 299, description: 'Rev up with Denji’s chaotic demon-hunting in this wild manga volume.', categoryId: 1, image: 'https://m.media-amazon.com/images/I/91-gKvmZkNL._AC_UF350,350_QL80_.jpg', inStock: false },
            { name: 'Tokyo Ghoul Vol.1', price: 299, description: 'Explore Ken Kaneki’s dark world of ghouls in this haunting manga.', categoryId: 1, image: 'https://m.media-amazon.com/images/I/81gv-D-LqhL.jpg', inStock: false },
            { name: 'Demon Slayer Vol.6', price: 299, description: 'Follow Tanjiro’s heartfelt demon-slaying journey in this emotional volume.', categoryId: 1, image: 'https://cdn.myshoptet.com/usr/www.nekonecno.sk/user/shop/big/67889_demon-slayer--kimetsu-no-yaiba-6.jpg?6644df83', inStock: true },
            { name: 'Spy x Family Vol.3', price: 299, description: 'Enjoy the Forger family’s hilarious adventures in this charming manga.', categoryId: 1, image: 'https://fantasyobchod.gumlet.io/spy-x-family-3-61f399db46ac9.jpeg?mode=fill&fill=solid&fill-color=ffffff&w=1000', inStock: true },

            // Figure (categoryId: 2)
            { name: 'Naruto Figure', price: 1990, description: 'Capture Naruto Uzumaki’s ninja spirit with this dynamic figure.', categoryId: 2, image: 'https://d817fw12ute41.cloudfront.net/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/i/m/img_7877.jpg', inStock: true },
            { name: 'Sasuke Figure', price: 1991, description: 'Showcase Sasuke Uchiha’s cool intensity with this detailed figure.', categoryId: 2, image: 'https://m.media-amazon.com/images/I/71R7RFaMVyL.jpg', inStock: true },
            { name: 'Satoru Gojo Figure', price: 2390, description: 'Experience the power of the strongest sorcerer with this detailed Satoru Gojo figure.', categoryId: 2, image: 'https://toysonejapan.com/cdn/shop/files/s-l1600_02a4c86c-fb6b-4673-b70f-9deacbd3f4b3_700x700.jpg?v=1736852618', inStock: true },
            { name: 'Ryomen Sukuna Figure', price: 2190, description: 'Bring the King of Curses to your collection with this fearsome Sukuna figure.', categoryId: 2, image: 'https://iizo.shop/cdn/shop/files/4573102621047_1.jpg?v=1698118647&width=1920', inStock: true },
            { name: 'Itachi Uchiha Figure', price: 2090, description: 'Honor the legacy of Itachi Uchiha with this emotionally powerful figure.', categoryId: 2, image: 'https://ae01.alicdn.com/kf/Sdcbaeb3949fd4519aa8f96c3ac458f330.jpg', inStock: true },
            { name: 'Giyu Tomioka Figure', price: 1890, description: 'Unleash the calm and deadly Water Hashira with this Giyu Tomioka figure.', categoryId: 2, image: 'https://i5.walmartimages.com/asr/e1cee304-ff9e-42bc-b428-0c89e25ea3c1.9374bf24de453a4e6cde8a81ae501773.jpeg', inStock: true },
            { name: 'Zero Two Figure', price: 2290, description: 'Add a touch of rebellion and charm with this beautiful Zero Two figure.', categoryId: 2, image: 'https://cdn.sellio.net/vendors/phpThumb/phpThumb.php?w=450&h=450&sia=x_prf82129.jpg&src=/uploads/129/products/61619/x_prf82129.jpg&fltr[]=wmi|/uploads/129/files/vodotlac10.png|C&far=1', inStock: true },
            { name: 'Ken Kaneki Figure', price: 1999, description: 'Step into the world of ghouls with this intense Ken Kaneki figure in mask.', categoryId: 2, image: 'https://ae01.alicdn.com/kf/HTB1h4.TQXXXXXb1XpXXq6xXFXXXG/Anime-Tokyo-Ghoul-Kaneki-Ken-Awakened-Toy-Figure-Figurine-Doll-New-in-Retail-Box-2-Types.jpg', inStock: true },
            { name: 'Tanjiro Figure', price: 1995, description: 'Capture Tanjiro Kamado’s determination with this Demon Slayer figure.', categoryId: 2, image: 'https://m.media-amazon.com/images/I/81bVOjMDseL._AC_SL1500_.jpg', inStock: true },
            { name: 'Nezuko Figure', price: 2300, description: 'Add Nezuko’s adorable yet fierce presence to your collection.', categoryId: 2, image: 'https://a.allegroimg.com/original/1120cd/fce7fddd40b5b7c153bc59eac7b1/ANIME-DEMON-SLAYER-FIGURE-15CM-Kamado-Nezuko', inStock: true },
            { name: 'Itadori Figure', price: 2990, description: 'Bring Yuji Itadori’s fearless energy to life with this figure.', categoryId: 2, image: 'https://m.media-amazon.com/images/I/611jjAGPhKL._AC_UF894,1000_QL80_.jpg', inStock: true },
            { name: 'Levi Figure', price: 1456, description: 'Honor Levi Ackerman’s unmatched skill with this sleek figure.', categoryId: 2, image: 'https://m.media-amazon.com/images/I/61IuykUBj5L.jpg', inStock: true },
            { name: 'Rem Figure', price: 3245, description: 'Celebrate Re:Zero with this charming Rem collectible figure.', categoryId: 2, image: 'https://d3nt9em9l1urz8.cloudfront.net/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/t/o/tot82984_1.jpg', inStock: false },
            { name: 'Kakashi Figure', price: 1997, description: 'Display the legendary Kakashi Hatake with this detailed figure.', categoryId: 2, image: 'https://d3nt9em9l1urz8.cloudfront.net/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/t/o/tomh83300-1.jpg', inStock: true },
            { name: 'Goku Figure', price: 1993, description: 'Power up your collection with this vibrant Goku figure.', categoryId: 2, image: 'https://media.cdn.kaufland.de/product-images/1024x1024/b84ae0ddd5e9079f779c088bd83f9c50.jpg', inStock: false },
            { name: 'Luffy Figure', price: 1998, description: 'Set sail with this lively Monkey D. Luffy figure.', categoryId: 2, image: 'https://fantasyobchod.gumlet.io/figurka-one-piece-monkey-d-luffy-poskozeny-obal-6441fb07e61a7.jpeg', inStock: false },

            // Poster (categoryId: 3)
            { name: 'Naruto Poster', price: 450, description: 'Brighten your space with this vibrant Naruto poster.', categoryId: 3, image: 'https://cdn.myshoptet.com/usr/www.nekonecno.sk/user/shop/big/80065_naruto-group-poster-3665361063452.jpg?6644df83', inStock: true },
            { name: 'One Piece Poster', price: 450, description: 'Sail into adventure with this colorful One Piece poster.', categoryId: 3, image: 'https://i5.walmartimages.com/seo/One-Piece-Crew-Wall-Poster-22-375-x-34_2901a89f-bb19-4301-b683-406a00d93649.fb4d63e14d403bbe674231615897c40e.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF', inStock: true },
            { name: 'Bleach Poster', price: 450, description: 'Add bold style with this striking Bleach poster.', categoryId: 3, image: 'https://cdn.myshoptet.com/usr/www.nekonecno.sk/user/shop/big/112340_bleach-thousand-year-blood-war-ichigo-poster-91-5-x-61-cm-plagat-3665361146100-1.jpg?6734575c', inStock: true },
            { name: 'AOT Poster', price: 450, description: 'Showcase Attack on Titan’s epic intensity with this poster.', categoryId: 3, image: 'https://cdn.myshoptet.com/usr/www.nekonecno.sk/user/shop/big/75469_attack-on-titan-attack-poster-5028486280278.jpg?6644df83', inStock: true },
            { name: 'Demon Slayer Poster', price: 450, description: 'Celebrate Tanjiro with this stunning Demon Slayer poster.', categoryId: 3, image: 'https://i5.walmartimages.com/asr/ad5dafd7-4ed8-4947-a79a-7fa3ce7965ce.b0baefc63fed209eb36ca9916b1fa7e7.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF', inStock: true },
            { name: 'Ghibli Poster', price: 450, description: 'Bring Studio Ghibli’s magic to life with this poster.', categoryId: 3, image: 'https://academymuseumstore.org/cdn/shop/products/printimageredo9.jpg?v=1656522855', inStock: true },
            { name: 'JJK Poster', price: 450, description: 'Energize your space with this vibrant Jujutsu Kaisen poster.', categoryId: 3, image: 'https://images-cdn.ubuy.co.in/664f3282954ab73e9b7f88db-jujutsu-kaisen-season-2-poster-janpanese.jpg', inStock: true },
            { name: 'Tokyo Ghoul Poster', price: 450, description: 'Embrace the dark with this haunting Tokyo Ghoul poster.', categoryId: 3, image: 'https://www.grindstore.com/cdn/shop/files/147081-front_99d798fa-a481-491f-99e5-ead3a108506c.jpg?v=1711028587', inStock: true },
            { name: 'Code Geass Poster', price: 450, description: 'Display Lelouch’s genius with this sleek Code Geass poster.', categoryId: 3, image: 'https://m.media-amazon.com/images/I/61UceJVE+OL.jpg', inStock: false },
            { name: 'Evangelion Poster', price: 450, description: 'Dive into Evangelion’s world with this striking poster.', categoryId: 3, image: 'https://media.posterlounge.com/img/products/720000/716064/716064_poster.jpg', inStock: false },

            // Badge (categoryId: 4)
            { name: 'Naruto Badge', price: 150, description: 'Show off your ninja pride with this bold Naruto badge.', categoryId: 4, image: 'https://i.pinimg.com/564x/38/aa/43/38aa43c4e4e03f71eb250f8250c16a9b.jpg', inStock: true },
            { name: 'Sailor Moon Badge', price: 150, description: 'Shine bright with this magical Sailor Moon badge.', categoryId: 4, image: 'hhttps://i.ebayimg.com/images/g/IncAAOSw1y1iD3JC/s-l1200.png', inStock: true },
            { name: 'Spy x Family Badge', price: 150, description: 'Carry the Forger family’s charm with this badge.', categoryId: 4, image: 'https://aniporium.ph/cdn/shop/products/000799446_01.jpg?v=1717400906', inStock: true },
            { name: 'Bleach Badge', price: 150, description: 'Rock Ichigo’s soul-reaper style with this Bleach badge.', categoryId: 4, image: 'https://amilab.ca/cdn/shop/files/4580722003511.webp?v=1733950698', inStock: true },
            { name: 'JJK Badge', price: 150, description: 'Display your Jujutsu Kaisen fandom with this badge.', categoryId: 4, image: 'https://goodsrepublic.com/media/binary/010/101/035/10101035.jpg.webp', inStock: true },
            { name: 'Demon Slayer Badge', price: 150, description: 'Honor Tanjiro’s bravery with this Demon Slayer badge.', categoryId: 4, image: 'https://amilab.ca/cdn/shop/files/DemonSlayerAnimeMerch-GlitterCanBadgeCollectionKyojuroRengoku_713x_94233a0f-9882-471a-989c-c80f55001ac2.webp?v=1725078188', inStock: true },
            { name: 'One Piece Badge', price: 150, description: 'Sail with Luffy’s crew with this One Piece badge.', categoryId: 4, image: 'https://i.ebayimg.com/images/g/sCYAAOSw-1Fgu3lR/s-l400.jpg', inStock: false },
            { name: 'Death Note Badge', price: 150, description: 'Embrace Light’s mystery with this Death Note badge.', categoryId: 4, image: 'https://m.media-amazon.com/images/I/71f1Dafq0jL.jpg', inStock: true },
            { name: 'Tokyo Ghoul Badge', price: 150, description: 'Show your ghoul side with this Tokyo Ghoul badge.', categoryId: 4, image: 'https://minijapanshop.eu/11431-large_default/tokyo-ghoul-set-of-6-pin-badges.jpg', inStock: true },
            { name: 'Ghibli Badge', price: 150, description: 'Add Studio Ghibli magic with this whimsical badge.', categoryId: 4, image: 'https://ghibli.store/wp-content/uploads/2020/05/Ghibli-Pin.jpg', inStock: false },

            // Clothing (categoryId: 5)
            { name: 'Naruto Hoodie', price: 2500, description: 'Stay cozy with this vibrant Naruto-themed hoodie.', categoryId: 5, image: 'https://m.media-amazon.com/images/I/51iK4v1+pFL._AC_UY1100_.jpg', inStock: true },
            { name: 'Sasuke T-shirt', price: 1500, description: 'Rock Sasuke’s cool vibe with this Naruto T-shirt.', categoryId: 5, image: 'https://m.media-amazon.com/images/I/B1pppR4gVKL._CLa%7C2140%2C2000%7C81uuhooNBJL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UY1000_.png', inStock: true },
            { name: 'Demon Slayer Jacket', price: 2800, description: 'Brave the elements with this bold Demon Slayer jacket.', categoryId: 5, image: 'https://cdn.animebape.com/wp-content/uploads/2023/04/kamado-tanjiro-demon-slayer-streetwear-zip-hoodie-jacket-0lajq.jpg', inStock: true },
            { name: 'JJK Sweater', price: 2200, description: 'Stay warm with this comfy Jujutsu Kaisen sweatshirt.', categoryId: 5, image: 'https://m.media-amazon.com/images/I/51NL3MTVeqL._AC_UY1000_.jpg', inStock: true },
            { name: 'One Piece T-shirt', price: 1500, description: 'Set sail in style with this One Piece T-shirt.', categoryId: 5, image: 'https://m.media-amazon.com/images/I/51TOraQbTgL._AC_UY1000_.jpg', inStock: false },
            { name: 'Ghibli Pajamas', price: 1800, description: 'Dream in Studio Ghibli magic with these pajamas.', categoryId: 5, image: 'https://gullprint.com/wp-content/uploads/2024/11/Spirit-Ghibli-Movie-Silk-Pajama-Set-2.jpeg', inStock: false },
            { name: 'AOT Hoodie', price: 2500, description: 'Show Scout Regiment pride with this AOT hoodie.', categoryId: 5, image: 'https://m.media-amazon.com/images/I/61F-XUOA7TL._AC_UY1000_.jpg', inStock: true },
            { name: 'Bleach Longsleeve', price: 1700, description: 'Stay stylish with this sleek Bleach longsleeve.', categoryId: 5, image: 'https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dw54885182/images/6780497100844-1-ripple-junction-unisex-t-shirts-bleach-ichigo-repetition-long-sleeve-crunchyroll-exclusive-30226975916076.jpg', inStock: true },
            { name: 'Code Geass Shirt', price: 1600, description: 'Command attention with this Code Geass T-shirt.', categoryId: 5, image: 'https://m.media-amazon.com/images/I/61SF1CXjNlL._AC_UY1000_.jpg', inStock: true },
            { name: 'Spy x Family T-shirt', price: 1500, description: 'Join the Forgers with this Spy x Family T-shirt.', categoryId: 5, image: 'https://www.nuclearblast.com/cdn/shop/files/spyxfamily_fullofsurpriseswhite_tops_tshirt_rw-spyf-0001a_5056688527587_591225-1306_nm_wb_front_ebee24e9-0da4-47f3-95b5-9e4822057913.jpg?v=1745428871', inStock: true },

            // Accessories (categoryId: 6)
            { name: 'Nezuko Bag', price: 1900, description: 'Carry essentials with this adorable Nezuko bag.', categoryId: 6, image: 'https://m.media-amazon.com/images/I/61VIqZnekjL._AC_UF894,1000_QL80_.jpg', inStock: true },
            { name: 'Death Note Wallet', price: 980, description: 'Keep cash secure with this Death Note wallet.', categoryId: 6, image: 'https://www.merchandisingplaza.co.uk/527239/2/Wallets-Death-Note-Death-Note-Premium-Wallet-l.jpg', inStock: true },
            { name: 'Ghibli Pendant', price: 1350, description: 'Add Studio Ghibli charm with this elegant pendant.', categoryId: 6, image: 'https://cdn.media.amplience.net/s/hottopic/20977507_hi?$productMainDesktop$&fmt=auto', inStock: true },
            { name: 'Naruto Headband', price: 650, description: 'Channel your inner ninja with this Naruto headband.', categoryId: 6, image: 'https://kaihamastore.com/cdn/shop/files/510-QGinidS._SL1024.jpg?v=1708947622&width=480', inStock: true },
            { name: 'Sailor Moon Ring', price: 1200, description: 'Shine with magical style in this Sailor Moon ring.', categoryId: 6, image: 'https://soulboundnyc.com/cdn/shop/files/SoulboundCosmosRing14KYFront.png?v=1714097977', inStock: true },
            { name: 'Evangelion Bracelet', price: 1500, description: 'Embrace futuristic vibes with this Evangelion bracelet.', categoryId: 6, image: 'https://makeshop-multi-images.akamaized.net/PLUGinc/shopimages/63/27/3_000000002763.jpg?1684281726', inStock: true },
            { name: 'Bleach Keychain', price: 450, description: 'Carry Ichigo’s spirit with this Bleach keychain.', categoryId: 6, image: 'https://sc04.alicdn.com/kf/Hce0d694179f04a1cb343192fb58378d2C.jpg', inStock: true },
            { name: 'Tokyo Ghoul Watch', price: 2100, description: 'Stay on time with this Tokyo Ghoul watch.', categoryId: 6, image: 'https://resize.cdn.otakumode.com/ex/1200.1200/shop/product/e485516608b74c69a2f4031115235393.jpg', inStock: true },
            { name: 'Spy x Family Brooch', price: 1300, description: 'Add playful charm with this Spy x Family brooch.', categoryId: 6, image: 'https://m.media-amazon.com/images/I/51NzCYkKzFL._AC_SY1000_.jpg', inStock: true },
            { name: 'AOT Necklace', price: 1150, description: 'Honor the Scouts with this Attack on Titan necklace.', categoryId: 6, image: 'https://img.joomcdn.net/9c89af5bd9423ae731612bfd1a890d00dfeedc13_original.jpeg', inStock: true },

            // Funko Pop! Anime (categoryId: 7)
            { name: 'Naruto Funko', price: 1200, description: 'Collect Naruto Uzumaki in this iconic Funko Pop!', categoryId: 7, image: 'https://doc.brloh.sk/pic/7VMF300401-600-600.webp', inStock: true },
            { name: 'Sasuke Funko', price: 1200, description: 'Add Sasuke’s intensity with this Funko Pop!', categoryId: 7, image: 'https://doc.brloh.sk/pic/M9M9000O01-600-600.jpg', inStock: true },
            { name: 'Luffy Funko', price: 1200, description: 'Sail with Luffy in this vibrant One Piece Funko!', categoryId: 7, image: 'https://www.gamers.sk/content/product_instances_cover/Konzolvilag_1/1401844/ajandektargyak-funko-pop-98-animation-one-piece-monkey-d-luffy-vinyl-figure.jpg', inStock: true },
            { name: 'Tanjiro Funko', price: 1200, description: 'Capture Tanjiro’s bravery with this Demon Slayer Funko!', categoryId: 7, image: 'https://media.cdn.kaufland.de/product-images/2048x2048/ded4e3d34e337b9b4ee3ece92ba5c45d.webp', inStock: true },
            { name: 'Nezuko Funko', price: 1200, description: 'Bring Nezuko’s charm with this Demon Slayer Funko!', categoryId: 7, image: 'https://a.allegroimg.com/original/112219/48cacf3e44a48007c34ad6a3598e/Figurka-Funko-Pop-Demon-Slayer-868-Nezuko-Kamado', inStock: true },
            { name: 'Levi Funko', price: 1200, description: 'Honor Levi’s prowess with this Attack on Titan Funko!', categoryId: 7, image: 'https://doc.brloh.sk/pic/LBDI100501-600-600.jpg', inStock: true },
            { name: 'Kakashi Funko', price: 1200, description: 'Showcase Kakashi’s style with this Naruto Funko Pop!', categoryId: 7, image: 'https://doc.brloh.sk/pic/CFVY600301-600-600.jpg', inStock: true },
            { name: 'Itadori Funko', price: 1200, description: 'Add Yuji Itadori’s energy with this Jujutsu Kaisen Funko!', categoryId: 7, image: 'https://i5.walmartimages.com/asr/a411ca2a-c91b-4afc-b68c-ff5823615524.8aaf504f0f1fa525b59f4159982f3405.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF', inStock: true },
            { name: 'Goku Funko', price: 1200, description: 'Power up with this iconic Dragon Ball Z Goku Funko!', categoryId: 7, image: 'https://cdn.myshoptet.com/usr/www.fantasystore.sk/user/shop/big/3546_fk3807.jpg?6176d475', inStock: false },
            { name: 'Satoru Gojo Funko', price: 1250, description: 'Get the coolest sorcerer with this stylish Satoru Gojo Funko Pop!', categoryId: 7, image: 'https://doc.brloh.sk/pic/AQQ9000601-600-600.webp', inStock: true },
            { name: 'Ryomen Sukuna Funko', price: 1250, description: 'Summon the King of Curses with this powerful Sukuna Funko Pop!', categoryId: 7, image: 'https://doc.brloh.sk/pic/3UK9700301-600-600.jpg', inStock: true },
            { name: 'Itachi Uchiha Funko', price: 1300, description: 'Embrace the legend with this iconic Itachi Uchiha Funko Pop!', categoryId: 7, image: 'https://img-cdn.heureka.group/v1/1778ff2c-b044-4894-917b-bc7095827ef2.jpg?width=350&height=350', inStock: true },
            { name: 'Giyu Tomioka Funko', price: 1190, description: 'Wield the Water Breathing technique with Giyu Tomioka Funko Pop!', categoryId: 7, image: 'https://img-cdn.heureka.group/v1/2139aee8-4ed4-4fdd-a1d7-13e2602bffe2.jpg?width=350&height=350', inStock: true },
            { name: 'Denji Funko', price: 1350, description: 'Bring charm and rebellion with this lovely Denji Funko Pop!', categoryId: 7, image: 'https://comicwarehouse.co.za/wp-content/uploads/2024/09/FN-POP-00080320-600x600.jpg', inStock: true },
            { name: 'Ken Kaneki Funko', price: 1290, description: 'Unleash your inner ghoul with this masked Ken Kaneki Funko Pop!', categoryId: 7, image: 'https://doc.brloh.sk/pic/4DJ1000O01-600-600.webp', inStock: true },

            // Stationery (categoryId: 8)
            { name: 'Naruto Notebook', price: 600, description: 'Jot down ninja dreams in this vibrant Naruto notebook.', categoryId: 8, image: 'https://cdn.europosters.eu/image/1300/notebooks/naruto-shippuden-kohona-group-i106976.jpg', inStock: true },
            { name: 'Bleach Pencil Case', price: 800, description: 'Keep pens organized with this sleek Bleach pencil case.', categoryId: 8, image: 'https://m.media-amazon.com/images/I/71+NKNR-olL._AC_UF894,1000_QL80_.jpg', inStock: true },
            { name: 'Demon Slayer Ruler', price: 200, description: 'Measure with style using this Demon Slayer ruler.', categoryId: 8, image: 'https://yes-tm.com/image/catalog/product/370678-1.jpg', inStock: false },
            { name: 'One Piece Stickers', price: 300, description: 'Decorate with adventure using these One Piece stickers.', categoryId: 8, image: 'https://img.joomcdn.net/8f8d78ebd54e82f28779266223ed25ac25520cfb_original.jpeg', inStock: true },
            { name: 'AOT Bookmark Set', price: 400, description: 'Mark pages with this epic Attack on Titan bookmark set.', categoryId: 8, image: 'https://ae01.alicdn.com/kf/HTB1Al0fXyrxK1RkHFCcq6AQCVXaF.jpg', inStock: false },
            { name: 'Ghibli Calendar', price: 950, description: 'Plan your year with Studio Ghibli’s magical calendar.', categoryId: 8, image: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2024/08/untitled8-4.jpg', inStock: false },
            { name: 'Death Note Pen', price: 250, description: 'Write your story with this Death Note pen.', categoryId: 8, image: 'https://i.ebayimg.com/images/g/xPkAAOSwu7hlVvvu/s-l1200.jpg', inStock: true },
            { name: 'Tokyo Ghoul Eraser', price: 150, description: 'Erase with style using this Tokyo Ghoul eraser.', categoryId: 8, image: 'https://i.ebayimg.com/images/g/EssAAOSwkbpl0dqo/s-l400.jpg', inStock: true },
            { name: 'Spy x Family Diary', price: 1000, description: 'Plan missions with this charming Spy x Family diary.', categoryId: 8, image: 'https://www.japanzon.com/169280-product_large/bandai-namco-games-spy-x-family-operation-diary-going-out-edition-for-nintendo-switch.jpg', inStock: true },
            { name: 'Evangelion Folder', price: 500, description: 'Keep papers safe with this futuristic Evangelion folder.', categoryId: 8, image: 'https://m.media-amazon.com/images/I/71a-POmbIjL.jpg', inStock: true }
        ],
    });
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());