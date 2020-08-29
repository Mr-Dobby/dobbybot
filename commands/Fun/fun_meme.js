const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
const meme_imgs = [
    'https://cdn.discordapp.com/attachments/573255412598571053/586325220055580673/image0.jpg',
    'https://cdn.discordapp.com/attachments/573255412598571053/586324876223184897/image8.jpg',
    'https://cdn.discordapp.com/attachments/573255412598571053/586324875694833665/image1.jpg',
    'https://cdn.discordapp.com/attachments/573255412598571053/586324875694833664/image3.png',
    'https://cdn.discordapp.com/attachments/573255412598571053/586324875208032287/image2.png',
    'https://cdn.discordapp.com/attachments/573255412598571053/586324875208032284/image0.png',
    'https://cdn.discordapp.com/attachments/573255412598571053/586324874675486816/image6.jpg',
    'https://cdn.discordapp.com/attachments/573255412598571053/586324874671292524/image7.jpg',
    'https://cdn.discordapp.com/attachments/573255412598571053/586324874151329796/image5.jpg',
    'https://cdn.discordapp.com/attachments/573255412598571053/586324874151329793/image4.jpg',
    'https://cdn.discordapp.com/attachments/573255412598571053/586324697038323732/video.mov',
    'https://cdn.discordapp.com/attachments/573255412598571053/586324132912693249/image0.png',
    'https://cdn.discordapp.com/attachments/570715588096426005/586326070236807186/image1.jpg',
    'https://cdn.discordapp.com/attachments/570715588096426005/586326070890987520/image0.jpg',
    'https://cdn.discordapp.com/attachments/570715588096426005/586540302085390336/2018-09-11-image-34.png',
    'https://cdn.discordapp.com/attachments/573255412598571053/586540789837070336/an9wRXz_700b.png',
    'https://cdn.discordapp.com/attachments/573255412598571053/586541092988780570/a83NZAO_460s.png',
    'https://cdn.discordapp.com/attachments/573255412598571053/586541305417564161/aB0zjzP_460s.png',
    'https://cdn.discordapp.com/attachments/573255412598571053/586541840447307806/a4QynKZ_460s.png',
    'https://cdn.discordapp.com/attachments/573255412598571053/586542043057356810/a4Qy3LQ_460s.png',
    'https://cdn.discordapp.com/attachments/573255412598571053/586542241615446057/av8wzpX_460s.png',
    'https://cdn.discordapp.com/attachments/573255412598571053/586542324432240652/apmwKeE_460s.png',
    'https://cdn.discordapp.com/attachments/573255412598571053/586542365951393831/aA35dPo_460s.png',
    'https://img-9gag-fun.9cache.com/photo/aZLXAYz_460swp.webp',
    'https://cdn.discordapp.com/attachments/575053997514424339/585375056822140938/a4QKX21_460s.png',
    'https://external-preview.redd.it/jJRbLhuBO9pSeVFtCUgJdt-qps-ERt5x2UQfkKXwKJ0.jpg?auto=webp&s=5ed72fa83e194f55f2142178b514048ca842f6a8',
    'https://cdn.discordapp.com/attachments/572916231854751765/585424357115822091/unknown.png',
    'https://cdn.discordapp.com/attachments/572916231854751765/585424871413121024/unknown.png',
    'https://cdn.discordapp.com/attachments/572916231854751765/585423345672257537/unknown.png',
    'https://cdn.discordapp.com/attachments/572916231854751765/585418424663015424/unknown.png',
    'https://images-cdn.9gag.com/photo/aWYyrP4_700b.jpg',
    'https://image.prntscr.com/image/CHkS_FuWTb2TUR2XOoMD-Q.png',
    'https://images-cdn.9gag.com/photo/a73gzRe_700b.jpg',
    'https://cdn.discordapp.com/attachments/505425626832830464/585230749028843539/FB_IMG_1559600201417.jpg',
    'https://cdn.discordapp.com/attachments/572916231854751765/582310958500806666/meme.png',
    'https://cdn.discordapp.com/attachments/572916231854751765/581243966020648994/meme.png',
    'https://cdn.discordapp.com/attachments/573255412598571053/586542727785611265/aNYMzbr_460s.png',
    'https://cdn.discordapp.com/attachments/573255412598571053/586542781715972106/aYY6E6q_460s.png',
    'https://cdn.discordapp.com/attachments/575053997514424339/586915767065509908/20190207_223501.png',
    'https://cdn.discordapp.com/attachments/575053997514424339/587067279800533010/All-time-gold.jpg',
    'https://img-9gag-fun.9cache.com/photo/a9KgR0K_700bwp.webp',
    'https://img-9gag-fun.9cache.com/photo/ayBjBer_700bwp.webp',
    'https://img-9gag-fun.9cache.com/photo/a73Rwjw_700bwp.webp',
    'https://img-9gag-fun.9cache.com/photo/axzq12D_700bwp.webp',
    'https://img-9gag-fun.9cache.com/photo/aWY3xEZ_460swp.webp',
    'https://preview.redd.it/dgndaxw37c531.jpg?width=640&crop=smart&auto=webp&s=158686a4a4cb2288b9941eab60f59acde5481792',
    'https://img-9gag-fun.9cache.com/photo/aMZMjAM_700bwp.webp',
    'http://imgur.com/UlH96aI.jpg',
    'https://cdn.discordapp.com/attachments/575053997514424339/592032273495490591/IMG_20190622_184238.jpg',
    'https://i.redd.it/0ilh488xbudz.png',
    'https://cdn.discordapp.com/attachments/310611569794875404/353539349742092289/image.jpg',
    'http://weknowmemes.com/wp-content/uploads/2012/02/the-internet-is-a-series-of-tubes-and-theyre-full-of-cats.jpg',
    'http://assets8.popbuzz.com/2017/09/shooting-stars-meme-1488215847-list-handheld-0.png',
    'http://imgur.com/vG98twU',
    'https://thechive.files.wordpress.com/2016/07/the-dankest-memes-of-all-time-38-photos-36.jpg?quality=85&strip=info&w=600',
    'https://media0.giphy.com/media/ehc19YLR4Ptbq/giphy.gif',
    'https://qph.ec.quoracdn.net/main-qimg-cf520202236c0a99986988706131aafb-c',
    'https://qph.ec.quoracdn.net/main-qimg-762390f6c44fdcb31cf01657d776d181-c',
    'https://s-media-cache-ak0.pinimg.com/originals/2b/87/17/2b8717e385f04061c8b6b78cd4c663c7.jpg',
    'https://lh3.googleusercontent.com/-VHV916run58/WC9To_x72tI/AAAAAAAACkE/f59cQ9_9-XY/safe_image_thumb.gif?imgmax=800',
    'https://digitalsynopsis.com/wp-content/uploads/2015/03/web-designer-developer-jokes-humour-funny-41.jpg',
    'https://pbs.twimg.com/media/ClH8MiWUgAAkIqr.jpg',
    'https://s-media-cache-ak0.pinimg.com/originals/35/01/ae/3501ae95813921b4a17e7d9469f1ba05.jpg',
    'https://img.memecdn.com/me-programmer_o_331911.jpg',
    'https://s-media-cache-ak0.pinimg.com/736x/d4/f2/00/d4f20041254a0727ddce7cb81be9e68c.jpg',
    'https://wyncode.co/wp-content/uploads/2014/08/81.jpg',
    'http://4.bp.blogspot.com/-u16rpXWn7Nw/U1jWM7-8NVI/AAAAAAAAHkY/gshqLZwE8iE/s1600/Difference+Between+Gamers+&+Programmers+Keyboard.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvk7n1gMlDTW4V4BJ9dVbJuMNs0Js7nVXt2WqHzCU5hXbGNe2u',
    'http://2.bp.blogspot.com/-94oft_Og47c/U1ja4YagplI/AAAAAAAAHlU/Q0dCHUkj0_s/s1600/How+Programmers+Talk.jpg',
    'https://wyncode.co/wp-content/uploads/2014/08/191.jpg',
    'https://s-media-cache-ak0.pinimg.com/736x/cc/42/ae/cc42ae3bf4a60760c48f25b654c0cc83.jpg',
    'https://s-media-cache-ak0.pinimg.com/736x/e8/48/18/e84818a407481f290a786a9cadb2ee03.jpg',
    'https://s-media-cache-ak0.pinimg.com/736x/00/88/15/008815b7888e82d5a82dbd8eac2f0205.jpg',
    'https://s-media-cache-ak0.pinimg.com/736x/33/06/85/330685a41fa6198be3aee58339a37c62.jpg',
    'https://s-media-cache-ak0.pinimg.com/736x/03/a1/75/03a17558ed2efaea1ca19bbddea51dff.jpg',
    'https://s-media-cache-ak0.pinimg.com/736x/4f/54/29/4f5429df5ea6361fa8d3f08dfcdccdf9.jpg',
    'https://s-media-cache-ak0.pinimg.com/736x/6e/f0/bc/6ef0bc2a3298187807efa501cb05a375.jpg',
    'https://s-media-cache-ak0.pinimg.com/736x/ce/46/a6/ce46a66f29e4cc4a8179e44d70d2e560.jpg',
    'https://s-media-cache-ak0.pinimg.com/736x/20/1e/b1/201eb13e53e5d038e54b16f4f5786d0f.jpg',
    'https://s-media-cache-ak0.pinimg.com/736x/45/2b/9c/452b9c8cacfb365f9afa5baaa0bb59b4.jpg',
    'https://s-media-cache-ak0.pinimg.com/736x/ee/9a/08/ee9a08c938b4856c1b4d08486c89ad13.jpg',
    'https://s-media-cache-ak0.pinimg.com/736x/7e/90/6b/7e906b6eeac775ad40290f6d7a65f59c.jpg',
    'https://s-media-cache-ak0.pinimg.com/736x/eb/b5/d8/ebb5d8cb556236a732549ad83937546b.jpg',
    'https://s-media-cache-ak0.pinimg.com/736x/a2/9a/bc/a29abc6432badfba5106344c11c88029.jpg',
    'https://s-media-cache-ak0.pinimg.com/236x/87/dd/9e/87dd9ed4e8edeff76f8e5a1218656e16.jpg',
    'https://s-media-cache-ak0.pinimg.com/236x/eb/b5/d8/ebb5d8cb556236a732549ad83937546b.jpg',
    'https://s-media-cache-ak0.pinimg.com/236x/9f/7c/42/9f7c42a12a59e2706b144d62d9b67f4e.jpg',
    'https://cdn.discordapp.com/attachments/304065566396645377/323264999684309002/b5ac1149b38bfeec57a6e81331b699a675a2223faa69943c15a35c9409ba463f.png',
    'https://cdn.discordapp.com/attachments/283339767884677121/307266230203711489/image.jpg',
    'http://quotesnhumor.com/wp-content/uploads/2016/12/30-In-Real-Life-Memes-3-Real-Life-Funny-Memes.jpg',
    'http://cbsnews1.cbsistatic.com/hub/i/r/2016/12/20/d4acaba0-86d5-43ed-8f75-78b7ba6b8608/resize/620x465/e1d65d1488d27435ddc9e0670299dc44/screen-shot-2016-12-20-at-2-01-34-pm.png',
    'https://s-media-cache-ak0.pinimg.com/736x/3b/f8/39/3bf839473fdec43adaaba5b475832e3a.jpg',
    'http://www.fullredneck.com/wp-content/uploads/2016/04/Funny-Russia-Meme-20.jpg',
    'https://img.washingtonpost.com/news/the-intersect/wp-content/uploads/sites/32/2015/04/obama-meme.jpg',
    'http://www.fullredneck.com/wp-content/uploads/2016/11/Funny-Global-Warming-Meme-13.jpg',
    'https://s-media-cache-ak0.pinimg.com/736x/92/bd/51/92bd51939ce6e27f773aee3516b2cd6f.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8nr0iyakAda0ySUV_JceEiG9LNwNthZ71hrbvq1vhHd0j7UNdxw',
    'https://s-media-cache-ak0.pinimg.com/736x/6f/28/66/6f2866766ac899a6f91bb4775fc69b2d.jpg',
    'https://s-media-cache-ak0.pinimg.com/736x/e2/86/f9/e286f9d7ecf6f571b4a58215a2170a80.jpg',
    'https://s-media-cache-ak0.pinimg.com/736x/7f/bd/94/7fbd94ac3dca74643cc73aede5da366d.jpg',
    'https://s-media-cache-ak0.pinimg.com/736x/3d/54/8b/3d548b4bd6c1651bd13ac48edb07eba7.jpg',
    'https://s-media-cache-ak0.pinimg.com/736x/01/0b/68/010b68214bf1eeb91060732aa58bed1e.jpg',
    'https://s-media-cache-ak0.pinimg.com/736x/34/8a/92/348a92212ef1bcd89c94555e3d8380b5.jpg',
    'https://s-media-cache-ak0.pinimg.com/736x/88/40/22/8840225f3b254ee4ecaafa17b3cf324b.jpg',
    'https://s-media-cache-ak0.pinimg.com/736x/ff/56/59/ff56598016c0529acf61c70f80530456.jpg',
    'http://i0.kym-cdn.com/photos/images/original/001/256/969/543.jpg',
    'https://carlchenet.com/wp-content/uploads/2016/01/githubdown.png',
    'https://i.redd.it/0ilh488xbudz.png',
      'https://cdn.discordapp.com/attachments/310611569794875404/353539349742092289/image.jpg',
      'http://weknowmemes.com/wp-content/uploads/2012/02/the-internet-is-a-series-of-tubes-and-theyre-full-of-cats.jpg',
      'http://assets8.popbuzz.com/2017/09/shooting-stars-meme-1488215847-list-handheld-0.png',
      'http://imgur.com/vG98twU',
      'https://thechive.files.wordpress.com/2016/07/the-dankest-memes-of-all-time-38-photos-36.jpg?quality=85&strip=info&w=600',
      'https://media0.giphy.com/media/ehc19YLR4Ptbq/giphy.gif',
      'https://qph.ec.quoracdn.net/main-qimg-cf520202236c0a99986988706131aafb-c',
      'https://qph.ec.quoracdn.net/main-qimg-762390f6c44fdcb31cf01657d776d181-c',
      'https://s-media-cache-ak0.pinimg.com/originals/2b/87/17/2b8717e385f04061c8b6b78cd4c663c7.jpg',
      'https://lh3.googleusercontent.com/-VHV916run58/WC9To_x72tI/AAAAAAAACkE/f59cQ9_9-XY/safe_image_thumb.gif?imgmax=800',
      'https://digitalsynopsis.com/wp-content/uploads/2015/03/web-designer-developer-jokes-humour-funny-41.jpg',
      'https://pbs.twimg.com/media/ClH8MiWUgAAkIqr.jpg',
      'https://s-media-cache-ak0.pinimg.com/originals/35/01/ae/3501ae95813921b4a17e7d9469f1ba05.jpg',
      'https://img.memecdn.com/me-programmer_o_331911.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/d4/f2/00/d4f20041254a0727ddce7cb81be9e68c.jpg',
      'https://wyncode.co/wp-content/uploads/2014/08/81.jpg',
      'http://4.bp.blogspot.com/-u16rpXWn7Nw/U1jWM7-8NVI/AAAAAAAAHkY/gshqLZwE8iE/s1600/Difference+Between+Gamers+&+Programmers+Keyboard.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvk7n1gMlDTW4V4BJ9dVbJuMNs0Js7nVXt2WqHzCU5hXbGNe2u',
      'http://2.bp.blogspot.com/-94oft_Og47c/U1ja4YagplI/AAAAAAAAHlU/Q0dCHUkj0_s/s1600/How+Programmers+Talk.jpg',
      'https://wyncode.co/wp-content/uploads/2014/08/191.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/cc/42/ae/cc42ae3bf4a60760c48f25b654c0cc83.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/e8/48/18/e84818a407481f290a786a9cadb2ee03.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/00/88/15/008815b7888e82d5a82dbd8eac2f0205.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/33/06/85/330685a41fa6198be3aee58339a37c62.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/03/a1/75/03a17558ed2efaea1ca19bbddea51dff.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/4f/54/29/4f5429df5ea6361fa8d3f08dfcdccdf9.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/6e/f0/bc/6ef0bc2a3298187807efa501cb05a375.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/ce/46/a6/ce46a66f29e4cc4a8179e44d70d2e560.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/20/1e/b1/201eb13e53e5d038e54b16f4f5786d0f.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/45/2b/9c/452b9c8cacfb365f9afa5baaa0bb59b4.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/ee/9a/08/ee9a08c938b4856c1b4d08486c89ad13.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/7e/90/6b/7e906b6eeac775ad40290f6d7a65f59c.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/eb/b5/d8/ebb5d8cb556236a732549ad83937546b.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/a2/9a/bc/a29abc6432badfba5106344c11c88029.jpg',
      'https://s-media-cache-ak0.pinimg.com/236x/87/dd/9e/87dd9ed4e8edeff76f8e5a1218656e16.jpg',
      'https://s-media-cache-ak0.pinimg.com/236x/eb/b5/d8/ebb5d8cb556236a732549ad83937546b.jpg',
      'https://s-media-cache-ak0.pinimg.com/236x/9f/7c/42/9f7c42a12a59e2706b144d62d9b67f4e.jpg',
      'https://cdn.discordapp.com/attachments/304065566396645377/323264999684309002/b5ac1149b38bfeec57a6e81331b699a675a2223faa69943c15a35c9409ba463f.png',
      'https://cdn.discordapp.com/attachments/283339767884677121/307266230203711489/image.jpg',
      'http://quotesnhumor.com/wp-content/uploads/2016/12/30-In-Real-Life-Memes-3-Real-Life-Funny-Memes.jpg',
      'http://cbsnews1.cbsistatic.com/hub/i/r/2016/12/20/d4acaba0-86d5-43ed-8f75-78b7ba6b8608/resize/620x465/e1d65d1488d27435ddc9e0670299dc44/screen-shot-2016-12-20-at-2-01-34-pm.png',
      'https://s-media-cache-ak0.pinimg.com/736x/3b/f8/39/3bf839473fdec43adaaba5b475832e3a.jpg',
      'http://www.fullredneck.com/wp-content/uploads/2016/04/Funny-Russia-Meme-20.jpg',
      'https://img.washingtonpost.com/news/the-intersect/wp-content/uploads/sites/32/2015/04/obama-meme.jpg',
      'http://www.fullredneck.com/wp-content/uploads/2016/11/Funny-Global-Warming-Meme-13.jpg',
      'https://i0.wp.com/blogs.techsmith.com/wp-content/uploads/2016/09/what-is-a-meme.jpg?resize=640%2C480',
      'https://s-media-cache-ak0.pinimg.com/736x/92/bd/51/92bd51939ce6e27f773aee3516b2cd6f.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8nr0iyakAda0ySUV_JceEiG9LNwNthZ71hrbvq1vhHd0j7UNdxw',
      'https://s-media-cache-ak0.pinimg.com/736x/6f/28/66/6f2866766ac899a6f91bb4775fc69b2d.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/e2/86/f9/e286f9d7ecf6f571b4a58215a2170a80.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/7f/bd/94/7fbd94ac3dca74643cc73aede5da366d.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/3d/54/8b/3d548b4bd6c1651bd13ac48edb07eba7.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/01/0b/68/010b68214bf1eeb91060732aa58bed1e.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/34/8a/92/348a92212ef1bcd89c94555e3d8380b5.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/88/40/22/8840225f3b254ee4ecaafa17b3cf324b.jpg',
      'https://s-media-cache-ak0.pinimg.com/736x/ff/56/59/ff56598016c0529acf61c70f80530456.jpg',
      'http://i0.kym-cdn.com/photos/images/original/001/256/969/543.jpg',
      'https://carlchenet.com/wp-content/uploads/2016/01/githubdown.png'

]

      message.delete();

      const RandomColour = ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
      const embed = new Discord.MessageEmbed()
          .setColor(RandomColour)
          .setImage(meme_imgs[Math.floor(Math.random() * meme_imgs.length)])

      message.channel.send(embed);
};

module.exports.help = {
  name: "meme",
  aliases: []
}
