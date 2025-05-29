import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

async function main() {
    await prisma.product.createMany({
        data: [
            // Manga (categoryId: 1)
            { name: 'Naruto Vol.1', price: 299, description: 'Dive into Naruto Uzumaki’s epic ninja journey in this action-packed first volume.', categoryId: 1, image: 'https://cdn1.ozone.ru/s3/multimedia-9/6151142337.jpg', inStock: true },
            { name: 'One Piece Vol.5', price: 299, description: 'Join Luffy’s thrilling quest for the One Piece in this high-seas adventure.', categoryId: 1, image: 'https://cdn1.ozone.ru/s3/multimedia-1-z/7328620391.jpg', inStock: true },
            { name: 'Attack on Titan Vol.3', price: 299, description: 'Experience intense battles against Titans in this gripping manga volume.', categoryId: 1, image: 'https://ir.ozone.ru/s3/multimedia-k/c1000/6198818084.jpg', inStock: true },
            { name: 'Death Note Vol.1', price: 299, description: 'Follow Light Yagami’s dark descent with the Death Note in this suspenseful classic.', categoryId: 1, image: 'https://i.ebayimg.com/images/g/vCIAAOSwgTxjHoQ1/s-l1200.jpg', inStock: true },
            { name: 'Jujutsu Kaisen Vol.2', price: 299, description: 'Unleash supernatural action with Yuji Itadori in this thrilling manga.', categoryId: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIWFVna3r9Z6hDfrdkQ_XvODNet6dQj46M1w&s', inStock: true },
            { name: 'Bleach Vol.7', price: 299, description: 'Join Ichigo’s soul-reaping adventures in this action-packed Bleach volume.', categoryId: 1, image: 'https://basket-15.wbbasket.ru/vol2266/part226687/226687236/images/big/1.webp', inStock: true },
            { name: 'Chainsaw Man Vol.4', price: 299, description: 'Rev up with Denji’s chaotic demon-hunting in this wild manga volume.', categoryId: 1, image: 'https://basket-12.wbbasket.ru/vol1738/part173827/173827640/images/big/1.webp', inStock: true },
            { name: 'Tokyo Ghoul Vol.1', price: 299, description: 'Explore Ken Kaneki’s dark world of ghouls in this haunting manga.', categoryId: 1, image: 'https://cdn.azbooka.ru/cv/w1100/0a1a1fd8-f38f-4ce2-84a8-74a83c63203c.jpg', inStock: true },
            { name: 'Demon Slayer Vol.6', price: 299, description: 'Follow Tanjiro’s heartfelt demon-slaying journey in this emotional volume.', categoryId: 1, image: 'https://imo10.labirint.ru/books/966779/cover.jpg/484-0', inStock: true },
            { name: 'Spy x Family Vol.3', price: 299, description: 'Enjoy the Forger family’s hilarious adventures in this charming manga.', categoryId: 1, image: 'https://imo10.labirint.ru/books/967003/cover.jpg/484-0', inStock: true },

            // Figure (categoryId: 2)
            { name: 'Naruto Figure', price: 1990, description: 'Capture Naruto Uzumaki’s ninja spirit with this dynamic figure.', categoryId: 2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfOxOXHLpmwdkLZY9hMfcDiqFGKsRxU2NPfg&s', inStock: true },
            { name: 'Sasuke Figure', price: 1990, description: 'Showcase Sasuke Uchiha’s cool intensity with this detailed figure.', categoryId: 2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXKR4QUZ6qvuyKa4I0z4NmnwyA-2DuVeIVdA&s', inStock: true },
            { name: 'Goku Figure', price: 1990, description: 'Power up your collection with this vibrant Goku figure.', categoryId: 2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRknew9tfkwpyI5jKP5PvINwREF4aADKXSaqQ&s', inStock: true },
            { name: 'Luffy Figure', price: 1990, description: 'Set sail with this lively Monkey D. Luffy figure.', categoryId: 2, image: 'https://diskomir.ru/upload/dev2fun.imagecompress/webp/iblock/23f/ajzh4ni59lujlk4tjrtxby73whtlr96y/figurka_variable_action_heroes_one_piece_monkey_d_luffy_ver_1_5_action_figure.webp', inStock: true },
            { name: 'Tanjiro Figure', price: 1990, description: 'Capture Tanjiro Kamado’s determination with this Demon Slayer figure.', categoryId: 2, image: 'https://m.media-amazon.com/images/I/81APJCYZhzL._AC_UF894,1000_QL80_.jpg', inStock: true },
            { name: 'Nezuko Figure', price: 1990, description: 'Add Nezuko’s adorable yet fierce presence to your collection.', categoryId: 2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE7mGqpBMLzUxKKRvLgMCrVDM3meae3ObqBA&s', inStock: true },
            { name: 'Itadori Figure', price: 1990, description: 'Bring Yuji Itadori’s fearless energy to life with this figure.', categoryId: 2, image: 'https://m.media-amazon.com/images/I/611jjAGPhKL.jpg', inStock: true },
            { name: 'Levi Figure', price: 1990, description: 'Honor Levi Ackerman’s unmatched skill with this sleek figure.', categoryId: 2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnP37AEGTk5xZCMqDj4-zizOh3FbYZr6p7yg&s', inStock: true },
            { name: 'Rem Figure', price: 1990, description: 'Celebrate Re:Zero with this charming Rem collectible figure.', categoryId: 2, image: 'https://http2.mlstatic.com/D_NQ_NP_867265-CBT76028931976_052024-O.webp', inStock: true },
            { name: 'Kakashi Figure', price: 1990, description: 'Display the legendary Kakashi Hatake with this detailed figure.', categoryId: 2, image: 'https://static.insales-cdn.com/images/products/1/1004/930743276/1.jpg', inStock: true },

            // Poster (categoryId: 3)
            { name: 'Naruto Poster', price: 450, description: 'Brighten your space with this vibrant Naruto poster.', categoryId: 3, image: 'https://ir.ozone.ru/s3/multimedia-r/c1000/6821967483.jpg', inStock: true },
            { name: 'One Piece Poster', price: 450, description: 'Sail into adventure with this colorful One Piece poster.', categoryId: 3, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpgrxcPgMnmGry1KcrlIp_apHn94dsSrq7GA&s', inStock: true },
            { name: 'Bleach Poster', price: 450, description: 'Add bold style with this striking Bleach poster.', categoryId: 3, image: 'https://japanesegallery.com/pub/media/catalog/product/cache/7e991fa6b61968a7414c4c2fad2046e8/j/g/jgkp1156v_s.jpg', inStock: true },
            { name: 'AOT Poster', price: 450, description: 'Showcase Attack on Titan’s epic intensity with this poster.', categoryId: 3, image: 'https://m.media-amazon.com/images/I/61t9ie31jgL._AC_UF894,1000_QL80_.jpg', inStock: true },
            { name: 'Demon Slayer Poster', price: 450, description: 'Celebrate Tanjiro with this stunning Demon Slayer poster.', categoryId: 3, image: 'https://m.media-amazon.com/images/I/91+ShpVWyiL._AC_UF894,1000_QL80_.jpg', inStock: true },
            { name: 'Ghibli Poster', price: 450, description: 'Bring Studio Ghibli’s magic to life with this poster.', categoryId: 3, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDo53FTk8AIjR4kB99fMUoLtKuWeuFvTMIBg&s', inStock: true },
            { name: 'JJK Poster', price: 450, description: 'Energize your space with this vibrant Jujutsu Kaisen poster.', categoryId: 3, image: 'https://m.media-amazon.com/images/I/818DUzqnwES.jpg', inStock: true },
            { name: 'Tokyo Ghoul Poster', price: 450, description: 'Embrace the dark with this haunting Tokyo Ghoul poster.', categoryId: 3, image: 'https://static.insales-cdn.com/images/products/1/7248/686718032/30bafe98-96c5-45de-947c-2cb7447b2d2e.d692a0b48a1f976f5cf3cff068ba1061.jpeg', inStock: true },
            { name: 'Code Geass Poster', price: 450, description: 'Display Lelouch’s genius with this sleek Code Geass poster.', categoryId: 3, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:QCBVZ_XV8WWa4Bu1n9tyDYOM9jT5j6J9rWuA&s', inStock: true },
            { name: 'Evangelion Poster', price: 450, description: 'Dive into Evangelion’s world with this striking poster.', categoryId: 3, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:Qsjv7TGbjfkXBPzEwgJ-2u6Ihu4-IoqxeRRg&s', inStock: true },

            // Badge (categoryId: 4)
            { name: 'Naruto Badge', price: 150, description: 'Show off your ninja pride with this bold Naruto badge.', categoryId: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:Qonyl7TJmLvAnEjHAckL4vrPz2oND5t-zPEg&s', inStock: true },
            { name: 'Sailor Moon Badge', price: 150, description: 'Shine bright with this magical Sailor Moon badge.', categoryId: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:Rwlv2JA32wHnL2HMTSIZh_Sv1pPuHw21-riA&s', inStock: true },
            { name: 'Spy x Family Badge', price: 150, description: 'Carry the Forger family’s charm with this badge.', categoryId: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:Txfn1xsk8ukyBGxRKFgN3c6MiIUr7By0_t0cTl4qm3XSDK7ejqJJHUpSbi-5Bvrw34iSo&usqp=CAU', inStock: true },
            { name: 'Bleach Badge', price: 150, description: 'Rock Ichigo’s soul-reaper style with this Bleach badge.', categoryId: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:QytbgiGh2YC7lMT6OqFyfNjcbXSVoOnx94dw&s', inStock: true },
            { name: 'JJK Badge', price: 150, description: 'Display your Jujutsu Kaisen fandom with this badge.', categoryId: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:QpwJV-sLVipIs4ggna4NudcOSND2wQMFOT0g&s', inStock: true },
            { name: 'Demon Slayer Badge', price: 150, description: 'Honor Tanjiro’s bravery with this Demon Slayer badge.', categoryId: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:TbXGkaQaIRk_QgV9SMY3_z2Fn3XW0-nx29Fg&s', inStock: true },
            { name: 'One Piece Badge', price: 150, description: 'Sail with Luffy’s crew with this One Piece badge.', categoryId: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:Tzq_KqGEhDT7oWWqyaYlvhecWvIlDBUMhHuA&s', inStock: true },
            { name: 'Death Note Badge', price: 150, description: 'Embrace Light’s mystery with this Death Note badge.', categoryId: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:S2E_yHWJrJKPjUt9sc95CB7cA_P_2xjtZOYw&s', inStock: true },
            { name: 'Tokyo Ghoul Badge', price: 150, description: 'Show your ghoul side with this Tokyo Ghoul badge.', categoryId: 4, image: 'https://ryazan.vse-footbolki.ru/image/cache/catalog/vsm/0/2/2589/2589865/previews/people_1_sign_front_white_700-280x280.jpg', inStock: true },
            { name: 'Ghibli Badge', price: 150, description: 'Add Studio Ghibli magic with this whimsical badge.', categoryId: 4, image: 'https://ir.ozone.ru/s3/multimedia-7/c1000/6846832951.jpg', inStock: true },

            // Clothing (categoryId: 5)
            { name: 'Naruto Hoodie', price: 2500, description: 'Stay cozy with this vibrant Naruto-themed hoodie.', categoryId: 5, image: 'https://encrypted-tbn0.gstatic.com/images?q=RTb6YfSXNmzHoYW0QfIA6HAbxZAlUPNZbVyQ&s', inStock: true },
            { name: 'Sasuke T-shirt', price: 1500, description: 'Rock Sasuke’s cool vibe with this Naruto T-shirt.', categoryId: 5, image: 'https://encrypted-tbn0.gstatic.com/images?q=SIIRDjauxyOSIC_JLQ_1qhHXrY70KI536ALw&s', inStock: true },
            { name: 'Demon Slayer Jacket', price: 2800, description: 'Brave the elements with this bold Demon Slayer jacket.', categoryId: 5, image: 'https://encrypted-tbn0.gstatic.com/images?q=QK2tLcp2BM-QJ70TzI14JPh6ANLP4tRfl-SQ&s', inStock: true },
            { name: 'JJK Sweater', price: 2200, description: 'Stay warm with this comfy Jujutsu Kaisen sweatshirt.', categoryId: 5, image: 'https://encrypted-tbn0.gstatic.com/images?q=T6g90fFD_rEI0aHqWEt2hZHxdbz9ChkblIFA&s', inStock: true },
            { name: 'One Piece T-shirt', price: 1500, description: 'Set sail in style with this One Piece T-shirt.', categoryId: 5, image: 'https://encrypted-tbn0.gstatic.com/images?q=QxrQnX4myYiAi5sjFsakm-Oh Cz3W7rTU7GcQ&s', inStock: true },
            { name: 'Ghibli Pajamas', price: 1800, description: 'Dream in Studio Ghibli magic with these pajamas.', categoryId: 5, image: 'https://encrypted-tbn0.gstatic.com/images?q=T1CPyarMBy-sitAFV3qG6ZUPn3KblvUTSn7Q&s', inStock: true },
            { name: 'AOT Hoodie', price: 2500, description: 'Show Scout Regiment pride with this AOT hoodie.', categoryId: 5, image: 'https://encrypted-tbn0.gstatic.com/images?q=RbcPwa74pJSxrLcFSeN1XuoDRn4sYGRm_2kQ&s', inStock: true },
            { name: 'Bleach Longsleeve', price: 1700, description: 'Stay stylish with this sleek Bleach longsleeve.', categoryId: 5, image: 'https://encrypted-tbn0.gstatic.com/images?q=QTTkYteSihVcGqtXqGG34n-yQKeFaPn5jvmQ&s', inStock: true },
            { name: 'Code Geass Shirt', price: 1600, description: 'Command attention with this Code Geass T-shirt.', categoryId: 5, image: 'https://printbar.ru/upload/images/bf/bf5apu6.jpg', inStock: true },
            { name: 'Spy x Family T-shirt', price: 1500, description: 'Join the Forgers with this Spy x Family T-shirt.', categoryId: 5, image: 'https://encrypted-tbn0.gstatic.com/images?q=QObsWPoH4pDmP9qYGArS6AAud_SUNGUraUGg&s', inStock: true },

            // Accessories (categoryId: 6)
            { name: 'Nezuko Bag', price: 1900, description: 'Carry essentials with this adorable Nezuko bag.', categoryId: 6, image: 'https://img3.playprint.ru/products/waist-bag-3d/2/8/8/2885107/VXYnmQFtLnayRWldLXZo5TLtTbM0N2Aw.jpg', inStock: true },
            { name: 'Death Note Wallet', price: 980, description: 'Keep cash secure with this Death Note wallet.', categoryId: 6, image: 'https://encrypted-tbn0.gstatic.com/images?q=RRrC0ihgctoXjGCRC0i8DZanNnRAZJSCXZYQ&s', inStock: true },
            { name: 'Ghibli Pendant', price: 1350, description: 'Add Studio Ghibli charm with this elegant pendant.', categoryId: 6, image: 'https://encrypted-tbn0.gstatic.com/images?q=TmWzifPphd1Eb1ESOIPHNasjzwoZrpIo81OQ&s', inStock: true },
            { name: 'Naruto Headband', price: 650, description: 'Channel your inner ninja with this Naruto headband.', categoryId: 6, image: 'https://encrypted-tbn0.gstatic.com/images?q=QofsdTkXFtKIEDLpZvwCZTjT1rdmHc687Kqw&s', inStock: true },
            { name: 'Sailor Moon Ring', price: 1200, description: 'Shine with magical style in this Sailor Moon ring.', categoryId: 6, image: 'https://encrypted-tbn0.gstatic.com/images?q=QY7BeFPsPj19WVV7ZUF9ofzVu1rk9cq-ZqsA&s', inStock: true },
            { name: 'Evangelion Bracelet', price: 1500, description: 'Embrace futuristic vibes with this Evangelion bracelet.', categoryId: 6, image: 'https://ae04.alicdn.com/kf/Sf919132513e541789c13d0d181b398d9s.jpg', inStock: true },
            { name: 'Bleach Keychain', price: 450, description: 'Carry Ichigo’s spirit with this Bleach keychain.', categoryId: 6, image: 'https://ir.ozone.ru/s3/multimedia-l/c1000/6240815685.jpg', inStock: true },
            { name: 'Tokyo Ghoul Watch', price: 2100, description: 'Stay on time with this Tokyo Ghoul watch.', categoryId: 6, image: 'https://encrypted-tbn0.gstatic.com/images?q=SyKVPfrkNHmn5JkhRW8Q_38OxK_eF0uYGVCw&s', inStock: true },
            { name: 'Spy x Family Brooch', price: 1300, description: 'Add playful charm with this Spy x Family brooch.', categoryId: 6, image: 'https://ae04.alicdn.com/kf/S02a28b03426a4e969cba11b158a7f0cd3.jpg_480x480.jpg', inStock: true },
            { name: 'AOT Necklace', price: 1150, description: 'Honor the Scouts with this Attack on Titan necklace.', categoryId: 6, image: 'https://encrypted-tbn0.gstatic.com/images?q=QF68WNTg4RRRH-DzG041O7oB_7osrof9B1xQ&s', inStock: true },

            // Funko Pop! Anime (categoryId: 7)
            { name: 'Naruto Funko', price: 1200, description: 'Collect Naruto Uzumaki in this iconic Funko Pop!', categoryId: 7, image: 'https://encrypted-tbn0.gstatic.com/images?q=QOGn9wVKqlVmen7fVh4FRumXbyv5B_LaHXwA&s', inStock: true },
            { name: 'Sasuke Funko', price: 1200, description: 'Add Sasuke’s intensity with this Funko Pop!', categoryId: 7, image: 'https://funko-russia.ru/image/cache/data/anime/naruto/49k-717x512.jpg', inStock: true },
            { name: 'Luffy Funko', price: 1200, description: 'Sail with Luffy in this vibrant One Piece Funko!', categoryId: 7, image: 'https://encrypted-tbn0.gstatic.com/images?q=QO-mPi7QAt9WubKuFnb1dGWUpl_nQOgGURKw&s', inStock: true },
            { name: 'Tanjiro Funko', price: 1200, description: 'Capture Tanjiro’s bravery with this Demon Slayer Funko!', categoryId: 7, image: 'https://encrypted-tbn0.gstatic.com/images?q=R05S3FO2kFZ4uy2cLwyxWnfr504Yzjr7t2Yw&s', inStock: true },
            { name: 'Nezuko Funko', price: 1200, description: 'Bring Nezuko’s charm with this Demon Slayer Funko!', categoryId: 7, image: 'https://encrypted-tbn0.gstatic.com/images?q=TVclcJC1ZaXrpBfdUwG5JMV4TdwQytqsUekA&s', inStock: true },
            { name: 'Levi Funko', price: 1200, description: 'Honor Levi’s prowess with this Attack on Titan Funko!', categoryId: 7, image: 'https://funko-russia.ru/image/cache/data/anime/attack-on-titan/2764-717x512.jpg', inStock: true },
            { name: 'Rem Funko', price: 1200, description: 'Celebrate Re:Zero with this lovely Rem Funko Pop!', categoryId: 7, image: 'https://encrypted-tbn0.gstatic.com/images?q=T7GIq6_7hAxQpzUlWIoR-o77SqOfo8GSRFdw&s', inStock: true },
            { name: 'Kakashi Funko', price: 1200, description: 'Showcase Kakashi’s style with this Naruto Funko Pop!', categoryId: 7, image: 'https://encrypted-tbn0.gstatic.com/images?q=QObwMYlHq9Peb6PmzGIkLQh83TtHd3PNKflA&s', inStock: true },
            { name: 'Itadori Funko', price: 1200, description: 'Add Yuji Itadori’s energy with this Jujutsu Kaisen Funko!', categoryId: 7, image: 'https://encrypted-tbn0.gstatic.com/images?q=TAPsYmi6vuLbng3kMsqwpDFUYq50-I-nw7Xg&s', inStock: true },
            { name: 'Goku Funko', price: 1200, description: 'Power up with this iconic Dragon Ball Z Goku Funko!', categoryId: 7, image: 'https://funkopoprussia.com/image/data/TV%20Show/Dragon%20Ball%20Z/FU3807lg.jpg', inStock: true },

            // Stationery (categoryId: 8)
            { name: 'Naruto Notebook', price: 600, description: 'Jot down ninja dreams in this vibrant Naruto notebook.', categoryId: 8, image: 'https://encrypted-tbn0.gstatic.com/images?q=TOagbdGY72azyIc0bPNsMPy-Cc3kFrsrjVdw&s', inStock: true },
            { name: 'Bleach Pencil Case', price: 800, description: 'Keep pens organized with this sleek Bleach pencil case.', categoryId: 8, image: 'https://storage.fabrikamaek.ru/images/0/2/2927/2927103/previews/people_4_pencil_case_front_white_500.jpg', inStock: true },
            { name: 'Demon Slayer Ruler', price: 200, description: 'Measure with style using this Demon Slayer ruler.', categoryId: 8, image: 'https://encrypted-tbn0.gstatic.com/images?q=Tnb8s2ckCUSOkIuYWyaAWpldKjXyjH9xw63w&s', inStock: true },
            { name: 'One Piece Stickers', price: 300, description: 'Decorate with adventure using these One Piece stickers.', categoryId: 8, image: 'https://ir.ozone.ru/s3/multimedia-8/c1000/6535137704.jpg', inStock: true },
            { name: 'AOT Bookmark Set', price: 400, description: 'Mark pages with this epic Attack on Titan bookmark set.', categoryId: 8, image: 'https://image.kazanexpress.ru/cc93585i6omb975u6dcg/t_product_high.jpg', inStock: true },
            { name: 'Ghibli Calendar', price: 950, description: 'Plan your year with Studio Ghibli’s magical calendar.', categoryId: 8, image: 'https://i.pinimg.com/736x/50/5c/91/505c91ebf2d7dd430ad8bd672bf62406.jpg', inStock: true },
            { name: 'Death Note Pen', price: 250, description: 'Write your story with this Death Note pen.', categoryId: 8, image: 'https://encrypted-tbn0.gstatic.com/images?q=SS65HwIoKhY6W4LY3TH-DFczH79fUVz86Chg&s', inStock: true },
            { name: 'Tokyo Ghoul Eraser', price: 150, description: 'Erase with style using this Tokyo Ghoul eraser.', categoryId: 8, image: 'https://encrypted-tbn0.gstatic.com/images?q=QlzHzhSCHdqYz1_l712gqIPcmrVqduVquslA&s', inStock: true },
            { name: 'Spy x Family Diary', price: 1000, description: 'Plan missions with this charming Spy x Family diary.', categoryId: 8, image: 'https://ae04.alicdn.com/kf/S34b18c6188894a06b76bb56b0ae43a6dn.png_480x480.png', inStock: true },
            { name: 'Evangelion Folder', price: 500, description: 'Keep papers safe with this futuristic Evangelion folder.', categoryId: 8, image: 'https://ir.ozone.ru/s3/multimedia-i/c1000/6438108354.jpg', inStock: true }
        ],
    });
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());