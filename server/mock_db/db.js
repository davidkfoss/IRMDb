const mockMovies = [
  {
    id: 1,
    title: 'Spider-Man: No Way Home',
    genre: ['Action', 'Adventure', 'Science Fiction'],
    releaseDate: '2021-12-15',
    posterUrl: 'https://image.tmdb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    overview:
      'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.',
    popularity: 5083.954,
  },
  {
    id: 2,
    title: 'The Batman',
    genre: ['Crime', 'Mystery', 'Thriller','Action'],
    releaseDate: '2022-03-01',
    posterUrl: 'https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    overview:
      'In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.',
    popularity: 3827.658,
  },
  {
    id: 3,
    title: 'No Exit',
    genre: ['Thriller','Action'],
    releaseDate: '2022-02-25',
    posterUrl: 'https://image.tmdb.org/t/p/original/vDHsLnOWKlPGmWs0kGfuhNF4w5l.jpg',
    overview:
      'Stranded at a rest stop in the mountains during a blizzard, a recovering addict discovers a kidnapped child hidden in a car belonging to one of the people inside the building which sets her on a terrifying struggle to identify who among them is the kidnapper.',
    popularity: 2618.087,
},
  {
    id: 4,
    title: 'Encanto',
    genre: ['Animation', 'Comedy', 'Family', 'Fantasy'],
    releaseDate: '2021-11-24',
    posterUrl: 'https://image.tmdb.org/t/p/original/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg',
    overview:
      "The tale of an extraordinary family, the Madrigals, who live hidden in the mountains of Colombia, in a magical house, in a vibrant town, in a wondrous, charmed place called an Encanto. The magic of the Encanto has blessed every child in the family with a unique gift from super strength to the power to heal—every child except one, Mirabel. But when she discovers that the magic surrounding the Encanto is in danger, Mirabel decides that she, the only ordinary Madrigal, might just be her exceptional family's last hope.",
    popularity: 2402.201,
  },
  {
    id: 5,
    title: "The King's Man",
    genre: ['Action', 'Adventure', 'Thriller', 'War'],
    releaseDate: '2021-12-22',
    posterUrl: 'https://image.tmdb.org/t/p/original/aq4Pwv5Xeuvj6HZKtxyd23e6bE9.jpg',
    overview:
      "As a collection of history's worst tyrants and criminal masterminds gather to plot a war to wipe out millions, one man must race against time to stop them.",
    popularity: 1895.511,
  },
  {
    id: 6,
    title: 'The Commando',
    genre: ['Action', 'Crime', 'Thriller'],
    releaseDate: '2022-01-07',
    posterUrl: 'https://image.tmdb.org/t/p/original/pSh8MyYu5CmfyWEHzv8FEARH2zq.jpg',
    overview:
      'An elite DEA agent returns home after a failed mission when his family makes an unexpected discovery in their house – a stash of money worth $3 million. They soon face the danger and threat of a newly released criminal and his crew, who will do whatever it takes to retrieve the money, including kidnap the agent’s daughters. Stakes are high and lives are at risk in this head-to-head battle as the agent stops at nothing to protect his family against the money-hungry criminals.',
    popularity: 1750.484,
  },
  {
    id: 7,
    title: 'Scream',
    genre: ['Horror', 'Mystery', 'Thriller'],
    releaseDate: '2022-01-12',
    posterUrl: 'https://image.tmdb.org/t/p/original/kZNHR1upJKF3eTzdgl5V8s8a4C3.jpg',
    overview:
      'Twenty-five years after a streak of brutal murders shocked the quiet town of Woodsboro, a new killer has donned the Ghostface mask and begins targeting a group of teenagers to resurrect secrets from the town’s deadly past.',
    popularity: 1675.161,
  },
  {
    id: 8,
    title: 'Kimi',
    genre: ['Thriller'],
    releaseDate: '2022-02-10',
    posterUrl: 'https://image.tmdb.org/t/p/original/okNgwtxIWzGsNlR3GsOS0i0Qgbn.jpg',
    overview:
      'A tech worker with agoraphobia discovers recorded evidence of a violent crime but is met with resistance when she tries to report it. Seeking justice, she must do the thing she fears the most: she must leave her apartment.',
    popularity: 1601.782,
  },
  {
    id: 9,
    title: 'Fistful of Vengeance',
    genre: ['Action', 'Crime', 'Fantasy'],
    releaseDate: '2022-02-17',
    posterUrl: 'https://image.tmdb.org/t/p/original/3cccEF9QZgV9bLWyupJO41HSrOV.jpg',
    overview:
      'A revenge mission becomes a fight to save the world from an ancient threat when superpowered assassin Kai tracks a killer to Bangkok.',
    popularity: 1594.013,
  },
  {
    id: 10,
    title: 'Eternals',
    genre: ['Science Fiction'],
    releaseDate: '2021-11-03',
    posterUrl: 'https://image.tmdb.org/t/p/original/zByhtBvX99ZiCQhac1sh9d9r6nb.jpg',
    overview:
      'The Eternals are a team of ancient aliens who have been living on Earth in secret for thousands of years. When an unexpected tragedy forces them out of the shadows, they are forced to reunite against mankind’s most ancient enemy, the Deviants.',
    popularity: 1537.406,
  },
  {
    id: 11,
    title: 'Pursuit',
    genre: ['Action', 'Crime', 'Thriller'],
    releaseDate: '2022-02-18',
    posterUrl: 'https://image.tmdb.org/t/p/original/wYihSXWYqN8Ejsdut2P1P0o97N0.jpg',
    overview:
      'Detective Breslin crosses paths with Calloway, a ruthless hacker desperate to find his wife, who has been kidnapped by a drug cartel. When Calloway escapes police custody, Breslin joins forces with a no-nonsense female cop to reclaim his prisoner. But is Calloway’s crime-boss father somehow involved in this explosive situation?',
    popularity: 1500.523,
  },
  {
    id: 12,
    title: "My Hero Academia: World Heroes' Mission",
    genre: ['Animation', 'Action', 'Fantasy', 'Adventure'],
    releaseDate: '2021-08-06',
    posterUrl: 'https://image.tmdb.org/t/p/original/4NUzcKtYPKkfTwKsLjwNt8nRIXV.jpg',
    overview:
      'A mysterious group called Humarize strongly believes in the Quirk Singularity Doomsday theory which states that when quirks get mixed further in with future generations, that power will bring forth the end of humanity. In order to save everyone, the Pro-Heroes around the world ask UA Academy heroes-in-training to assist them and form a world-classic selected hero team. It is up to the heroes to save the world and the future of heroes in what is the most dangerous crisis to take place yet in My Hero Academia.',
    popularity: 1485.064,
  },
  {
    id: 13,
    title: 'Restless',
    genre: ['Action', 'Thriller', 'Crime'],
    releaseDate: '2022-02-25',
    posterUrl: 'https://image.tmdb.org/t/p/original/aw4GGsRwhQtyLsjzC7dsAahfCDY.jpg',
    overview:
      "After going to extremes to cover up an accident, a corrupt cop's life spirals out of control when he starts receiving threats from a mysterious witness.",
    popularity: 1468.377,
  },
  {
    id: 14,
    title: 'Nightmare Alley',
    genre: ['Crime', 'Drama', 'Thriller'],
    releaseDate: '2021-12-02',
    posterUrl: 'https://image.tmdb.org/t/p/original/680klE0dIreQQOyWKFgNnCAJtws.jpg',
    overview:
      'An ambitious carnival man with a talent for manipulating people with a few well-chosen words hooks up with a female psychiatrist who is even more dangerous than he is.',
    popularity: 1455.144,
  },
  {
    id: 15,
    title: 'The Ice Age Adventures of Buck Wild',
    genre: ['Animation', 'Comedy', 'Adventure', 'Family'],
    releaseDate: '2022-01-28',
    posterUrl: 'https://image.tmdb.org/t/p/original/zzXFM4FKDG7l1ufrAkwQYv2xvnh.jpg',
    overview:
      "The fearless one-eyed weasel Buck teams up with mischievous possum brothers Crash & Eddie as they head off on a new adventure into Buck's home: The Dinosaur World.",
    popularity: 1431.307,
  },
  {
    id: 16,
    title: 'Hotel Transylvania: Transformania',
    genre: ['Animation', 'Family', 'Fantasy', 'Comedy', 'Adventure'],
    releaseDate: '2022-02-25',
    posterUrl: 'https://image.tmdb.org/t/p/original/teCy1egGQa0y8ULJvlrDHQKnxBL.jpg',
    overview: `When Van Helsing's mysterious invention, the "Monsterfication Ray," goes haywire, Drac and his monster pals are all transformed into humans, and Johnny becomes a monster. In their new mismatched bodies, Drac and Johnny must team up and race across the globe to find a cure before it's too late, and before they drive each other crazy.`,
    popularity: 1373.778,
  },
  {
    id: 17,
    title: 'Texas Chainsaw Massacre',
    genre: ['Horror'],
    releaseDate: '2022-02-18',
    posterUrl: 'https://image.tmdb.org/t/p/original/meRIRfADEGVo65xgPO6eZvJ0CRG.jpg',
    overview:
      'In this sequel, influencers looking to breathe new life into a Texas ghost town encounter Leatherface, an infamous killer who wears a mask of human skin.',
    popularity: 1312.79,
  },
  {
    id: 18,
    title: 'The Requin',
    genre: ['Thriller'],
    releaseDate: '2022-01-28',
    posterUrl: 'https://image.tmdb.org/t/p/original/i0z8g2VRZP3dhVvvSMilbOZMKqR.jpg',
    overview:
      'A couple on a romantic getaway find themselves stranded at sea when a tropical storm sweeps away their villa. In order to survive, they are forced to fight the elements, while sharks circle below.',
    popularity: 1252.317,
  },
  {
    id: 19,
    title: 'Looop Lapeta',
    genre: ['Action', 'Comedy', 'Crime'],
    releaseDate: '2022-02-04',
    posterUrl: 'https://image.tmdb.org/t/p/original/onGdT8sYi89drvSJyEJnft97rOq.jpg',
    overview:
      "When her boyfriend loses a mobster's cash, Savi races against the clock to save the day — if only she can break out of a curious cycle of dead ends.",
    popularity: 1240.946,
  },
  {
    id: 20,
    title: 'Red Notice',
    genre: ['Action', 'Comedy', 'Crime', 'Thriller'],
    releaseDate: '2021-11-04',
    posterUrl: 'https://image.tmdb.org/t/p/original/lAXONuqg41NwUMuzMiFvicDET9Y.jpg',
    overview:
      "An Interpol-issued Red Notice is a global alert to hunt and capture the world's most wanted. But when a daring heist brings together the FBI's top profiler and two rival criminals, there's no telling what will happen.",
    popularity: 1178.544,
  },
  {
    id: 21,
    title: 'Sing 2',
    genre: ['Animation', 'Comedy', 'Family', 'Music'],
    releaseDate: '2021-12-01',
    posterUrl: 'https://image.tmdb.org/t/p/original/aWeKITRFbbwY8txG5uCj4rMCfSP.jpg',
    overview:
      'Buster and his new cast now have their sights set on debuting a new show at the Crystal Tower Theater in glamorous Redshore City. But with no connections, he and his singers must sneak into the Crystal Entertainment offices, run by the ruthless wolf mogul Jimmy Crystal, where the gang pitches the ridiculous idea of casting the lion rock legend Clay Calloway in their show. Buster must embark on a quest to find the now-isolated Clay and persuade him to return to the stage.',
    popularity: 1112.9,
  },
  {
    id: 22,
    title: 'The Jack in the Box: Awakening',
    genre: ['Horror'],
    releaseDate: '2022-01-03',
    posterUrl: 'https://image.tmdb.org/t/p/original/3Ib8vlWTrAKRrTWUrTrZPOMW4jp.jpg',
    overview:
      'When a vintage Jack-in-the-box is opened by a dying woman, she enters into a deal with the demon within that would see her illness cured in return for helping it claim six innocent victims.',
    popularity: 1096.79,
  },
  {
    id: 23,
    title: 'Venom: Let There Be Carnage',
    genre: ['Science Fiction', 'Action', 'Adventure'],
    releaseDate: '2021-09-30',
    posterUrl: 'https://image.tmdb.org/t/p/original/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg',
    overview:
      'After finding a host body in investigative reporter Eddie Brock, the alien symbiote must face a new enemy, Carnage, the alter ego of serial killer Cletus Kasady.',
    popularity: 1053.615,
  },
  {
    id: 24,
    title: 'The Matrix Resurrections',
    genre: ['Science Fiction', 'Action', 'Adventure'],
    releaseDate: '2021-12-16',
    posterUrl: 'https://image.tmdb.org/t/p/original/8c4a8kE7PizaGQQnditMmI1xbRp.jpg',
    overview:
      "Plagued by strange memories, Neo's life takes an unexpected turn when he finds himself back inside the Matrix.",
    popularity: 941.024,
  },
  {
    id: 25,
    title: 'Resident Evil: Welcome to Raccoon City',
    genre: ['Horror', 'Action', 'Science Fiction'],
    releaseDate: '2021-11-24',
    posterUrl: 'https://image.tmdb.org/t/p/original/7uRbWOXxpWDMtnsd2PF3clu65jc.jpg',
    overview:
      'Once the booming home of pharmaceutical giant Umbrella Corporation, Raccoon City is now a dying Midwestern town. The company’s exodus left the city a wasteland…with great evil brewing below the surface. When that evil is unleashed, the townspeople are forever…changed…and a small group of survivors must work together to uncover the truth behind Umbrella and make it through the night.',
    popularity: 881.086,
  },
  {
    id: 26,
    title: 'Last Man Down',
    genre: ['Action', 'Thriller'],
    releaseDate: '2021-10-19',
    posterUrl: 'https://image.tmdb.org/t/p/original/4B7liCxNCZIZGONmAMkCnxVlZQV.jpg',
    overview:
      "After civilization succumbs to a deadly pandemic and his wife is murdered, a special forces soldier abandons his duty and becomes a hermit in the Nordic wilderness. Years later, a wounded woman appears on his doorstep. She's escaped from a lab and her pursuers believe her blood is the key to a worldwide cure. He's hesitant to get involved, but all doubts are cast aside when he discovers her pursuer is none other than Commander Stone, the man that murdered his wife some years ago.",
    popularity: 869.605,
  },
  {
    id: 27,
    title: 'American Siege',
    genre: ['Action', 'Thriller', 'Crime', 'Drama'],
    releaseDate: '2022-01-07',
    posterUrl: 'https://image.tmdb.org/t/p/original/daeVrgyj0ue8qb3AHyU3UeCwoZz.jpg',
    overview:
      'An ex-NYPD officer-turned-sheriff of a small rural Georgia town has to contend with a gang of thieves who have taken a wealthy doctor hostage.',
    popularity: 867.326,
  },
  {
    id: 28,
    title: 'Uncharted',
    genre: ['Action', 'Adventure'],
    releaseDate: '2022-02-10',
    posterUrl: 'https://image.tmdb.org/t/p/original/sqLowacltbZLoCa4KYye64RvvdQ.jpg',
    overview:
      'A young street-smart, Nathan Drake and his wisecracking partner Victor “Sully” Sullivan embark on a dangerous pursuit of “the greatest treasure never found” while also tracking clues that may lead to Nathan’s long-lost brother.',
    popularity: 866.391,
  },
  {
    id: 29,
    title: 'Demon Slayer -Kimetsu no Yaiba- The Movie: Mugen Train',
    genre: ['Animation', 'Action', 'Adventure', 'Fantasy'],
    releaseDate: '2020-10-16',
    posterUrl: 'https://image.tmdb.org/t/p/original/h8Rb9gBr48ODIwYUttZNYeMWeUU.jpg',
    overview:
      "Tanjirō Kamado, joined with Inosuke Hashibira, a boy raised by boars who wears a boar's head, and Zenitsu Agatsuma, a scared boy who reveals his true power when he sleeps, boards the Infinity Train on a new mission with the Fire Hashira, Kyōjurō Rengoku, to defeat a demon who has been tormenting the people and killing the demon slayers who oppose it!",
    popularity: 845.992,
  },
  {
    id: 30,
    title: 'Ghostbusters: Afterlife',
    genre: ['Fantasy', 'Comedy', 'Adventure'],
    releaseDate: '2021-11-11',
    posterUrl: 'https://image.tmdb.org/t/p/original/sg4xJaufDiQl7caFEskBtQXfD4x.jpg',
    overview:
      'When a single mom and her two kids arrive in a small town, they begin to discover their connection to the original Ghostbusters and the secret legacy their grandfather left behind.',
    popularity: 839.904,
  },
  {
    id: 31,
    title: 'The 355',
    genre: ['Action', 'Thriller'],
    releaseDate: '2022-01-05',
    posterUrl: 'https://image.tmdb.org/t/p/original/uQt2dJFMnJmAp9zLAWNfGilK0BW.jpg',
    overview:
      'A group of top female agents from American, British, Chinese, Columbian and German  government agencies are drawn together to try and stop an organization from acquiring a deadly weapon to send the world into chaos.',
    popularity: 781.748,
  },
  {
    id: 32,
    title: 'Shang-Chi and the Legend of the Ten Rings',
    genre: ['Action', 'Adventure', 'Fantasy'],
    releaseDate: '2021-09-01',
    posterUrl: 'https://image.tmdb.org/t/p/original/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg',
    overview:
      'Shang-Chi must confront the past he thought he left behind when he is drawn into the web of the mysterious Ten Rings organization.',
    popularity: 769.185,
  },
  {
    id: 33,
    title: 'Marry Me',
    genre: ['Romance', 'Comedy', 'Music'],
    releaseDate: '2022-02-09',
    posterUrl: 'https://image.tmdb.org/t/p/original/ko1JVbGj4bT8IhCWqjBQ6ZtF2t.jpg',
    overview:
      'Music superstars Kat Valdez and Bastian are getting married before a global audience of fans. But when Kat learns, seconds before her vows, that Bastian has been unfaithful, she decides to marry Charlie, a stranger in the crowd, instead.',
    popularity: 761.793,
  },
  {
    id: 34,
    title: 'The Hunting',
    genre: ['Horror'],
    releaseDate: '2022-01-21',
    posterUrl: 'https://image.tmdb.org/t/p/original/kvhrltQIRp1u84ao9uj52YPaWNY.jpg',
    overview:
      'When a mysterious animal attack leaves a mutilated body in the forest, a conservative small town detective must enlist the help of an eager wildlife specialist to uncover the dark and disturbing truth that threatens the town.',
    popularity: 761.127,
  },
  {
    id: 35,
    title: 'West Side Story',
    genre: ['Drama', 'Romance', 'Crime'],
    releaseDate: '2021-12-08',
    posterUrl: 'https://image.tmdb.org/t/p/original/yfz3IUoYYSY32tkb97HlUBGFsnh.jpg',
    overview:
      'Two youngsters from rival New York City gangs fall in love, but tensions between their respective friends build toward tragedy.',
    popularity: 678.186,
  },
  {
    id: 36,
    title: 'Through My Window',
    genre: ['Romance', 'Drama'],
    releaseDate: '2022-02-04',
    posterUrl: 'https://image.tmdb.org/t/p/original/6gg7fvKc1ZxP9yCczweSxIGYp4S.jpg',
    overview:
      "Raquel's longtime crush on her next-door neighbor turns into something more when he starts developing feelings for her, despite his family's objections.",
    popularity: 659.105,
  },
  {
    id: 37,
    title: 'The Seven Deadly Sins: Cursed by Light',
    genre: ['Animation', 'Fantasy'],
    releaseDate: '2021-07-02',
    posterUrl: 'https://image.tmdb.org/t/p/original/k0ThmZQl5nHe4JefC2bXjqtgYp0.jpg',
    overview: `With the help of the "Dragon Sin of Wrath" Meliodas and the worst rebels in history, the Seven Deadly Sins, the "Holy War", in which four races, including Humans, Goddesses, Fairies and Giants fought against the Demons, is finally over. At the cost of the "Lion Sin of Pride" Escanor's life, the Demon King was defeated and the world regained peace. After that, each of the Sins take their own path.`,
    popularity: 647.54,
  },
  {
    id: 38,
    title: 'One Shot',
    genre: ['Action'],
    releaseDate: '2021-11-05',
    posterUrl: 'https://image.tmdb.org/t/p/original/3OXiTjU30gWtqxmx4BU9RVp2OTv.jpg',
    overview:
      'An elite squad of Navy SEALs, on a covert mission to transport a prisoner off a CIA black site island prison, are trapped when insurgents attack while trying to rescue the same prisoner.',
    popularity: 622.24,
  },
  {
    id: 39,
    title: 'Tom and Jerry: Cowboy Up!',
    genre: ['Animation', 'Comedy', 'Family', 'Western'],
    releaseDate: '2022-01-24',
    posterUrl: 'https://image.tmdb.org/t/p/original/muIaHotSaSUQr0KZCIJOYQEe7y2.jpg',
    overview:
      'This time, the rivals team up to help a cowgirl and her brother save their homestead from a greedy land-grabber, and they’re going to need some help! Jerry’s three precocious nephews are all ready for action, and Tom is rounding up a posse of prairie dogs. But can a ragtag band of varmints defeat a deceitful desperado determined to deceive a damsel in distress? No matter what happens with Tom and Jerry in the saddle, it’ll be a rootin’ tootin’ good time!',
    popularity: 614.11,
  },
  {
    id: 40,
    title: 'Chernobyl: Abyss',
    genre: ['Drama', 'History', 'Adventure'],
    releaseDate: '2020-10-15',
    posterUrl: 'https://image.tmdb.org/t/p/original/AmJLuHjxPdIJO6vmymeWADG6jK5.jpg',
    overview:
      'The aftermath of a shocking explosion at the Chernobyl nuclear power station made hundreds of people sacrifice their lives to clean up the site of the catastrophe and to successfully prevent an even bigger disaster that could have turned a large part of the European continent into an uninhabitable exclusion zone. This is their story.',
    popularity: 601.958,
  },
  {
    id: 41,
    title: 'Desperate Riders',
    genre: ['Western', 'Action'],
    releaseDate: '2022-02-25',
    posterUrl: 'https://image.tmdb.org/t/p/original/7pYYGm1dWZGkbJuhcuaHD6nE6k7.jpg',
    overview:
      'After Kansas Red rescues young Billy from a card-game shootout, the boy asks Red for help protecting his family from the outlaw Thorn, who’s just kidnapped Billy’s mother, Carol. As Red and Billy ride off to rescue Carol, they run into beautiful, tough-as-nails Leslie, who’s managed to escape Thorn’s men. The three race to stop Thorn’s wedding to Carol with guns a-blazing - but does she want to be rescued?',
    popularity: 590.474,
  },
  {
    id: 42,
    title: 'Clifford the Big Red Dog',
    genre: ['Family', 'Adventure', 'Comedy', 'Fantasy'],
    releaseDate: '2021-11-10',
    posterUrl: 'https://image.tmdb.org/t/p/original/oifhfVhUcuDjE61V5bS5dfShQrm.jpg',
    overview:
      'As Emily struggles to fit in at home and at school, she discovers a small red puppy who is destined to become her best friend. When Clifford magically undergoes one heck of a growth spurt, becomes a gigantic dog and attracts the attention of a genetics company, Emily and her Uncle Casey have to fight the forces of greed as they go on the run across New York City. Along the way, Clifford affects the lives of everyone around him and teaches Emily and her uncle the true meaning of acceptance and unconditional love.',
    popularity: 585.011,
  },
  {
    id: 43,
    title: "Tyler Perry's A Madea Homecoming",
    genre: ['Comedy'],
    releaseDate: '2022-02-25',
    posterUrl: 'https://image.tmdb.org/t/p/original/vzX5GNRTXsAltdU1tfASmZbzYmv.jpg',
    overview:
      "Madea's back - hallelujer! And she's not putting up with any nonsense as family drama erupts at her great-grandson's college graduation celebration.",
    popularity: 577.591,
  },
  {
    id: 44,
    title: 'The Boss Baby: Family Business',
    genre: ['Animation', 'Comedy', 'Adventure', 'Family'],
    releaseDate: '2021-07-01',
    posterUrl: 'https://image.tmdb.org/t/p/original/kv2Qk9MKFFQo4WQPaYta599HkJP.jpg',
    overview:
      'The Templeton brothers — Tim and his Boss Baby little bro Ted — have become adults and drifted away from each other. But a new boss baby with a cutting-edge approach and a can-do attitude is about to bring them together again … and inspire a new family business.',
    popularity: 567.421,
  },
  {
    id: 45,
    title: 'Turning Red',
    genre: ['Animation', 'Family', 'Comedy', 'Fantasy'],
    releaseDate: '2022-03-10',
    posterUrl: 'https://image.tmdb.org/t/p/original/qsdjk9oAKSQMWs0Vt5Pyfh6O4GZ.jpg',
    overview:
      'Thirteen-year-old Mei is experiencing the awkwardness of being a teenager with a twist – when she gets too excited, she transforms into a giant red panda.',
    popularity: 564.507,
  },
  {
    id: 46,
    title: 'Brazen',
    genre: ['Thriller', 'Mystery', 'Drama'],
    releaseDate: '2022-01-13',
    posterUrl: 'https://image.tmdb.org/t/p/original/7e4n1GfC9iky9VQzH3cDQz9wYpO.jpg',
    overview:
      "Mystery writer Grace Miller has killer instincts when it comes to motive - and she'll need every bit of expertise to help solve her sister's murder.",
    popularity: 553.141,
  },
  {
    id: 47,
    title: 'The House',
    genre: ['Animation', 'Drama', 'Comedy', 'Horror'],
    releaseDate: '2022-01-14',
    posterUrl: 'https://image.tmdb.org/t/p/original/iZjMFSKCrleKolC1gYcz5Rs8bk1.jpg',
    overview:
      'Across different eras, a poor family, an anxious developer and a fed-up landlady become tied to the same mysterious house in this animated dark comedy.',
    popularity: 551.65,
  },
  {
    id: 48,
    title: 'Blacklight',
    genre: ['Action', 'Thriller'],
    releaseDate: '2022-02-10',
    posterUrl: 'https://image.tmdb.org/t/p/original/bv9dy8mnwftdY2j6gG39gCfSFpV.jpg',
    overview:
      'Travis Block is a shadowy Government agent who specializes in removing operatives whose covers have been exposed. He then has to uncover a deadly conspiracy within his own ranks that reaches the highest echelons of power.',
    popularity: 533.903,
  },
  {
    id: 49,
    title: "Ron's Gone Wrong",
    genre: ['Animation', 'Science Fiction', 'Family', 'Comedy'],
    releaseDate: '2021-10-15',
    posterUrl: 'https://image.tmdb.org/t/p/original/7M0uwPgwvPONdFG0jk8TPK09xJU.jpg',
    overview:
      "In a world where walking, talking, digitally connected bots have become children's best friends, an 11-year-old finds that his robot buddy doesn't quite work the same as the others do.",
    popularity: 509.277,
  },
  {
    id: 50,
    title: 'Free Guy',
    genre: ['Comedy', 'Action', 'Adventure', 'Science Fiction'],
    releaseDate: '2021-08-11',
    posterUrl: 'https://image.tmdb.org/t/p/original/xmbU4JTUm8rsdtn7Y3Fcm30GpeT.jpg',
    overview:
      'A bank teller called Guy realizes he is a background character in an open world video game called Free City that will soon go offline.',
    popularity: 447.872,
  },
  {
    id: 51,
    title: 'Cruella',
    genre: ['Comedy', 'Crime'],
    releaseDate: '2021-05-26',
    posterUrl: 'https://image.tmdb.org/t/p/original/wToO8opxkGwKgSfJ1JK8tGvkG6U.jpg',
    overview:
      'In 1970s London amidst the punk rock revolution, a young grifter named Estella is determined to make a name for herself with her designs. She befriends a pair of young thieves who appreciate her appetite for mischief, and together they are able to build a life for themselves on the London streets. One day, Estella’s flair for fashion catches the eye of the Baroness von Hellman, a fashion legend who is devastatingly chic and terrifyingly haute. But their relationship sets in motion a course of events and revelations that will cause Estella to embrace her wicked side and become the raucous, fashionable and revenge-bent Cruella.',
    popularity: 429.613,
  },
  {
    id: 52,
    title: 'The Suicide Squad',
    genre: ['Action', 'Adventure', 'Fantasy'],
    releaseDate: '2021-07-28',
    posterUrl: 'https://image.tmdb.org/t/p/original/kb4s0ML0iVZlG6wAKbbs9NAm6X.jpg',
    overview:
      'Supervillains Harley Quinn, Bloodsport, Peacemaker and a collection of nutty cons at Belle Reve prison join the super-secret, super-shady Task Force X as they are dropped off at the remote, enemy-infused island of Corto Maltese.',
    popularity: 424.983,
  },
  {
    id: 53,
    title: 'The Simpsons in Plusaversary',
    genre: ['Animation', 'Comedy', 'Fantasy'],
    releaseDate: '2021-11-12',
    posterUrl: 'https://image.tmdb.org/t/p/original/p5jzbffrXuBTjsiwrQ3aOMTrvCj.jpg',
    overview:
      "The Simpsons host a Disney+ Day party and everyone is on the list… except Homer. With friends from across the service and music fit for a Disney Princess, Plusaversary is Springfield's event of the year.",
    popularity: 418.589,
  },
  {
    id: 54,
    title: 'Forgive Us Our Trespasses',
    genre: ['Drama', 'War'],
    releaseDate: '2022-01-17',
    posterUrl: 'https://image.tmdb.org/t/p/original/4RYZSHM3eaxXAnjbgNiVaqmekL8.jpg',
    overview:
      'Targeted by Nazis as they hunt down and murder people with disabilities, a boy with a limb difference makes a daring decision while running for his life.',
    popularity: 409.688,
  },
  {
    id: 55,
    title: 'Luca',
    genre: ['Animation', 'Comedy', 'Family', 'Fantasy'],
    releaseDate: '2021-06-17',
    posterUrl: 'https://image.tmdb.org/t/p/original/jTswp6KyDYKtvC52GbHagrZbGvD.jpg',
    overview:
      'Luca and his best friend Alberto experience an unforgettable summer on the Italian Riviera. But all the fun is threatened by a deeply-held secret: they are sea monsters from another world just below the water’s surface.',
    popularity: 408.749,
  },
  {
    id: 56,
    title: 'Mortal Kombat',
    genre: ['Action', 'Fantasy', 'Adventure'],
    releaseDate: '2021-04-07',
    posterUrl: 'https://image.tmdb.org/t/p/original/nkayOAUBUu4mMvyNf9iHSUiPjF1.jpg',
    overview:
      "Washed-up MMA fighter Cole Young, unaware of his heritage, and hunted by Emperor Shang Tsung's best warrior, Sub-Zero, seeks out and trains with Earth's greatest champions as he prepares to stand against the enemies of Outworld in a high stakes battle for the universe.",
    popularity: 402.273,
  },
  {
    id: 57,
    title: "Zack Snyder's Justice League",
    genre: ['Action', 'Adventure', 'Fantasy', 'Science Fiction'],
    releaseDate: '2021-03-18',
    posterUrl: 'https://image.tmdb.org/t/p/original/tnAuB8q5vv7Ax9UAEje5Xi4BXik.jpg',
    overview:
      "Determined to ensure Superman's ultimate sacrifice was not in vain, Bruce Wayne aligns forces with Diana Prince with plans to recruit a team of metahumans to protect the world from an approaching threat of catastrophic proportions.",
    popularity: 398.461,
  },
  {
    id: 58,
    title: 'Mother/Android',
    genre: ['Science Fiction', 'Thriller'],
    releaseDate: '2021-12-17',
    posterUrl: 'https://image.tmdb.org/t/p/original/rO3nV9d1wzHEWsC7xgwxotjZQpM.jpg',
    overview:
      'Georgia and her boyfriend Sam go on a treacherous journey to escape their country, which is caught in an unexpected war with artificial intelligence. Days away from the arrival of their first child, the couple must face No Man’s Land—a stronghold of the android uprising—in hopes of reaching safety before giving birth.',
    popularity: 398.12,
  },
  {
    id: 59,
    title: 'Exploits of a Young Don Juan',
    genre: ['Comedy', 'Drama'],
    releaseDate: '1986-11-04',
    posterUrl: 'https://image.tmdb.org/t/p/original/oZvMcGvyTfrFLny6i3RJONQb5C9.jpg',
    overview:
      'Roger is a 16-year-old who seeks to lose his virginity in this erotic drama. His initial efforts are unsuccessful, but World War I breaks out and men are seen marching off to battle. Roger goes overboard when he is presented with several amorous opportunities.',
    popularity: 396.948,
  },
  {
    id: 60,
    title: 'Dune',
    genre: ['Science Fiction', 'Adventure'],
    releaseDate: '2021-09-15',
    posterUrl: 'https://image.tmdb.org/t/p/original/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
    overview:
      "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.",
    popularity: 394.295,
  },
  {
    id: 61,
    title: 'The Last Warrior: Root of Evil',
    genre: ['Fantasy', 'Adventure', 'Comedy'],
    releaseDate: '2021-01-01',
    posterUrl: 'https://image.tmdb.org/t/p/original/4qE7mvUYGY5epfcgeJpM6EfHgq5.jpg',
    overview:
      'Peace and tranquility have set in Belogorie. The evil was defeated and Ivan is now enjoying his well-deserved fame. He is surrounded by his family, friends and small wonders from the modern world that help him lead a comfortable life. Luckily, he has his Magic Sword to cut a gap between the worlds to get some supplies quite regularly. But when an ancient evil rises and the existence of the magic world is put to danger, Ivan has to team up with his old friends and his new rivals. They will set out on a long journey beyond the known world to find a way to defeat the enemies and to return peace to Belogorie.',
    popularity: 391.957,
  },
  {
    id: 62,
    title: 'The Privilege',
    genre: ['Horror'],
    releaseDate: '2022-02-09',
    posterUrl: 'https://image.tmdb.org/t/p/original/qBLi3Nd5JMQGMiOmmfuPgLw5SzD.jpg',
    overview:
      'A wealthy teen and his friends attending an elite private school uncover a dark conspiracy while looking into a series of strange supernatural events.',
    popularity: 387.924,
  },
  {
    id: 63,
    title: 'Queen of Spades',
    genre: ['Horror'],
    releaseDate: '2021-06-11',
    posterUrl: 'https://image.tmdb.org/t/p/original/4IKBzVBPLXu9p5cfEfdJjHdlafV.jpg',
    overview:
      'According to legend, an ominous entity known as the Queen of Spades can be summoned by performing an ancient ritual. Four teenagers summon the Queen of Spades, but they could never imagine the horrors that await them.',
    popularity: 387.159,
  },
  {
    id: 64,
    title: 'Antlers',
    genre: ['Drama', 'Horror', 'Mystery'],
    releaseDate: '2021-10-28',
    posterUrl: 'https://image.tmdb.org/t/p/original/cMch3tiexw3FdOEeZxMWVel61Xg.jpg',
    overview:
      'A small-town Oregon teacher and her brother, the local sheriff, discover a young student is harbouring a dangerous secret that could have frightening consequences.',
    popularity: 380.88,
  },
  {
    id: 65,
    title: 'Dangerous',
    genre: ['Action', 'Thriller'],
    releaseDate: '2021-11-05',
    posterUrl: 'https://image.tmdb.org/t/p/original/vTtkQGC7qKlSRQJZYtAWAmYdH0A.jpg',
    overview:
      'A reformed sociopath heads to a remote island after the death of his brother. Soon after his arrival, the island falls under siege from a deadly gang of mercenaries, and when he discovers their role in his brother’s demise, he sets out on a relentless quest for vengeance.',
    popularity: 379.856,
  },
  {
    id: 66,
    title: 'After We Fell',
    genre: ['Romance', 'Drama'],
    releaseDate: '2021-09-01',
    posterUrl: 'https://image.tmdb.org/t/p/original/dU4HfnTEJDf9KvxGS9hgO7BVeju.jpg',
    overview:
      "Just as Tessa's life begins to become unglued, nothing is what she thought it would be. Not her friends nor her family. The only person that she should be able to rely on is Hardin, who is furious when he discovers the massive secret that she's been keeping. Before Tessa makes the biggest decision of her life, everything changes because of revelations about her family.",
    popularity: 365.85,
  },
  {
    id: 67,
    title: 'No Time to Die',
    genre: ['Adventure', 'Action', 'Thriller'],
    releaseDate: '2021-09-29',
    posterUrl: 'https://image.tmdb.org/t/p/original/iUgygt3fscRoKWCV1d0C7FbM9TP.jpg',
    overview:
      'Bond has left active service and is enjoying a tranquil life in Jamaica. His peace is short-lived when his old friend Felix Leiter from the CIA turns up asking for help. The mission to rescue a kidnapped scientist turns out to be far more treacherous than expected, leading Bond onto the trail of a mysterious villain armed with dangerous new technology.',
    popularity: 360.164,
  },
  {
    id: 68,
    title: 'Sooryavanshi',
    genre: ['Action', 'Crime', 'Thriller'],
    releaseDate: '2021-11-05',
    posterUrl: 'https://image.tmdb.org/t/p/original/8p3mhjyLjHKtaAv8tFKfvEBtir0.jpg',
    overview:
      'A fearless, faithful albeit slightly forgetful Mumbai cop, Veer Sooryavanshi, the chief of the Anti-Terrorism Squad in India pulls out all the stops and stunts to thwart a major conspiracy to attack his city.',
    popularity: 352.368,
  },
  {
    id: 69,
    title: 'Finch',
    genre: ['Science Fiction', 'Drama', 'Adventure'],
    releaseDate: '2021-11-04',
    posterUrl: 'https://image.tmdb.org/t/p/original/jKuDyqx7jrjiR9cDzB5pxzhJAdv.jpg',
    overview:
      "On a post-apocalyptic Earth, a robot, built to protect the life of his dying creator's beloved dog, learns about life, love, friendship, and what it means to be human.",
    popularity: 348.942,
  },
  {
    id: 70,
    title: 'Two',
    genre: ['Thriller', 'Horror'],
    releaseDate: '2021-07-23',
    posterUrl: 'https://image.tmdb.org/t/p/original/5P7QwmoYl70tsRZ8e0VnI9RI1MF.jpg',
    overview: 'Two people, a man and a woman, wake up naked and with their abdomens attached to each other.',
    popularity: 342.661,
  },
  {
    id: 71,
    title: 'PAW Patrol: The Movie',
    genre: ['Animation', 'Family', 'Adventure', 'Comedy'],
    releaseDate: '2021-08-09',
    posterUrl: 'https://image.tmdb.org/t/p/original/ic0intvXZSfBlYPIvWXpU1ivUCO.jpg',
    overview:
      'Ryder and the pups are called to Adventure City to stop Mayor Humdinger from turning the bustling metropolis into a state of chaos.',
    popularity: 339.374,
  },
  {
    id: 72,
    title: 'Avengers: Infinity War',
    genre: ['Adventure', 'Action', 'Science Fiction'],
    releaseDate: '2018-04-25',
    posterUrl: 'https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
    overview:
      'As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.',
    popularity: 338.402,
  },
  {
    id: 73,
    title: 'Batman',
    genre: ['Fantasy', 'Action'],
    releaseDate: '1989-06-23',
    posterUrl: 'https://image.tmdb.org/t/p/original/jUhGHv4YihieVjhU2TmFaBsZ4Xg.jpg',
    overview: `Batman must face his most ruthless nemesis when a deformed madman calling himself "The Joker" seizes control of Gotham's criminal underworld.`,
    popularity: 338.272,
  },
  {
    id: 74,
    title: 'Black Widow',
    genre: ['Action', 'Adventure', 'Science Fiction'],
    releaseDate: '2021-07-07',
    posterUrl: 'https://image.tmdb.org/t/p/original/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg',
    overview:
      'Natasha Romanoff, also known as Black Widow, confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Pursued by a force that will stop at nothing to bring her down, Natasha must deal with her history as a spy and the broken relationships left in her wake long before she became an Avenger.',
    popularity: 337.651,
  },
  {
    id: 75,
    title: 'The Wonderful Winter of Mickey Mouse',
    genre: ['Animation', 'Comedy'],
    releaseDate: '2022-02-18',
    posterUrl: 'https://image.tmdb.org/t/p/original/3dspgMFx64kA8BqkGZQK6Hk1sCV.jpg',
    overview:
      'The wonder of the winter season takes Mickey Mouse and his friends on a journey through three magical stories.',
    popularity: 333.354,
  },
  {
    id: 76,
    title: 'F9',
    genre: ['Action', 'Crime', 'Thriller', 'Adventure'],
    releaseDate: '2021-05-19',
    posterUrl: 'https://image.tmdb.org/t/p/original/bOFaAXmWWXC3Rbv4u4uM9ZSzRXP.jpg',
    overview:
      "Dominic Toretto and his crew battle the most skilled assassin and high-performance driver they've ever encountered: his forsaken brother.",
    popularity: 331.944,
  },
  {
    id: 77,
    title: 'Moonfall',
    genre: ['Action', 'Adventure', 'Science Fiction'],
    releaseDate: '2022-02-03',
    posterUrl: 'https://image.tmdb.org/t/p/original/odVv1sqVs0KxBXiA8bhIBlPgalx.jpg',
    overview:
      'A mysterious force knocks the moon from its orbit around Earth and sends it hurtling on a collision course with life as we know it.',
    popularity: 328.678,
  },
  {
    id: 78,
    title: 'Sex, Shame and Tears 2',
    genre: ['Comedy', 'Drama'],
    releaseDate: '2022-02-04',
    posterUrl: 'https://image.tmdb.org/t/p/original/2ip2iDBSXfdHeXpR2qETGr5Q76V.jpg',
    overview:
      "Twenty years have passed since those two apartments in the heart of Mexico City were the battlefield of a war of the sexes between Ana, Carlos, Andrea, Miguel, Tomás and María. All that is left of those apartments are memories and the image of Tomás' dead body at the bottom of the elevator shaft. Their lives have changed, their families have grown and new and unexpected characters have come to unsettle their daily lives and trigger a chain of events that will make them realize that modesty has been replaced by public disclosure; sex is only an app away; but love...love is still something elusive that everyone in today's banal and chaotic world is seeking.",
    popularity: 325.624,
  },
  {
    id: 79,
    title: 'Diary of a Wimpy Kid',
    genre: ['Animation', 'Comedy', 'Family'],
    releaseDate: '2021-12-03',
    posterUrl: 'https://image.tmdb.org/t/p/original/obg6lWuNaZkoSlwrVG4VVk4SmT.jpg',
    overview:
      'Greg Heffley is a scrawny but ambitious kid with an active imagination and big plans to be rich and famous – he just has to survive middle school first.',
    popularity: 324.706,
  },
  {
    id: 80,
    title: 'AI Love You',
    genre: ['Comedy', 'Romance', 'Science Fiction'],
    releaseDate: '2022-02-15',
    posterUrl: 'https://image.tmdb.org/t/p/original/sBiJOvHCSWORnFpc4yItflIkdTi.jpg',
    overview:
      'A modern love story set in the near future where an AI building is powered by human feelings. Due to a software glitch, it falls in love with a real girl, escapes the building into the body of a real man, and tries to win her affections.',
    popularity: 317.643,
  },
  {
    id: 81,
    title: 'Sonic the Hedgehog 2',
    genre: ['Action', 'Science Fiction', 'Comedy', 'Family'],
    releaseDate: '2022-03-30',
    posterUrl: 'https://image.tmdb.org/t/p/original/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg',
    overview:
      'After settling in Green Hills, Sonic is eager to prove he has what it takes to be a true hero. His test comes when Dr. Robotnik returns, this time with a new partner, Knuckles, in search for an emerald that has the power to destroy civilizations. Sonic teams up with his own sidekick, Tails, and together they embark on a globe-trotting journey to find the emerald before it falls into the wrong hands.',
    popularity: 317.159,
  },
  {
    id: 82,
    title: 'Erax',
    genre: ['Mystery', 'Family'],
    releaseDate: '2022-02-17',
    posterUrl: 'https://image.tmdb.org/t/p/original/rMp04rYhy4yfOfjZq5F9R3wkeqo.jpg',
    overview:
      'Monstrous creatures leap from a magical storybook and unleash mayhem and mischief for Auntie Opal and her tween niece Nina in this spooky short film.',
    popularity: 317.102,
  },
  {
    id: 83,
    title: 'Deathstroke: Knights & Dragons - The Movie',
    genre: ['Animation', 'Action', 'Adventure', 'Science Fiction'],
    releaseDate: '2020-08-04',
    posterUrl: 'https://image.tmdb.org/t/p/original/vFIHbiy55smzi50RmF8LQjmpGcx.jpg',
    overview: 'The assassin Deathstroke tries to save his family from the wrath of H.I.V.E. and the murderous Jackal.',
    popularity: 314.388,
  },
  {
    id: 84,
    title: 'The Last Duel',
    genre: ['Action', 'Drama', 'History'],
    releaseDate: '2021-10-13',
    posterUrl: 'https://image.tmdb.org/t/p/original/zjrJE0fpzPvX8saJXj8VNfcjBoU.jpg',
    overview:
      'King Charles VI declares that Knight Jean de Carrouges settle his dispute with his squire, Jacques Le Gris, by challenging him to a duel.',
    popularity: 312.916,
  },
  {
    id: 85,
    title: 'The Pirates: The Last Royal Treasure',
    genre: ['Action', 'Adventure', 'Comedy', 'History'],
    releaseDate: '2022-01-26',
    posterUrl: 'https://image.tmdb.org/t/p/original/zAp8FqC4pLfqcsEfuHwQflCWsA5.jpg',
    overview:
      'A gutsy crew of Joseon pirates and bandits battle stormy waters, puzzling clues and militant rivals in search of royal gold lost at sea.',
    popularity: 311.94,
  },
  {
    id: 86,
    title: 'Paranormal Activity: Next of Kin',
    genre: ['Horror', 'Mystery', 'Thriller'],
    releaseDate: '2021-10-29',
    posterUrl: 'https://image.tmdb.org/t/p/original/bXAVveHiLotZbWdg3PKGhAzxYKP.jpg',
    overview:
      'Margot, a documentary filmmaker, heads to a secluded Amish community in the hopes of learning about her long-lost mother and extended family. Following a string of strange occurrences and discoveries, she comes to realize this community may not be what it seems.',
    popularity: 310.011,
  },
  {
    id: 87,
    title: 'House of Gucci',
    genre: ['Drama', 'Crime', 'Thriller'],
    releaseDate: '2021-11-24',
    posterUrl: 'https://image.tmdb.org/t/p/original/vHla3Ej2m53rNmvmYkzvennLrKn.jpg',
    overview:
      'When Patrizia Reggiani, an outsider from humble beginnings, marries into the Gucci family, her unbridled ambition begins to unravel the family legacy and triggers a reckless spiral of betrayal, decadence, revenge, and ultimately…murder.',
    popularity: 308.214,
  },
  {
    id: 88,
    title: 'Dark Spell',
    genre: ['Romance', 'Horror', 'Thriller'],
    releaseDate: '2021-02-11',
    posterUrl: 'https://image.tmdb.org/t/p/original/2AbGdSGlU6CpiV3lswHUgE5CdAA.jpg',
    overview: 'Terror strikes when a heartbroken woman uses black magic to get her husband back.',
    popularity: 308.037,
  },
  {
    id: 89,
    title: 'Jungle Cruise',
    genre: ['Action', 'Adventure', 'Comedy', 'Fantasy'],
    releaseDate: '2021-07-28',
    posterUrl: 'https://image.tmdb.org/t/p/original/9dKCd55IuTT5QRs989m9Qlb7d2B.jpg',
    overview:
      'Dr. Lily Houghton enlists the aid of wisecracking skipper Frank Wolff to take her down the Amazon in his dilapidated boat. Together, they search for an ancient tree that holds the power to heal – a discovery that will change the future of medicine.',
    popularity: 307.936,
  },
  {
    id: 90,
    title: 'Godzilla vs. Kong',
    genre: ['Action', 'Fantasy', 'Science Fiction'],
    releaseDate: '2021-03-24',
    posterUrl: 'https://image.tmdb.org/t/p/original/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg',
    overview:
      'In a time when monsters walk the Earth, humanity’s fight for its future sets Godzilla and Kong on a collision course that will see the two most powerful forces of nature on the planet collide in a spectacular battle for the ages.',
    popularity: 307.521,
  },
  {
    id: 91,
    title: 'The Amazing Spider-Man',
    genre: ['Action', 'Adventure', 'Fantasy'],
    releaseDate: '2012-06-23',
    posterUrl: 'https://image.tmdb.org/t/p/original/fSbqPbqXa7ePo8bcnZYN9AHv6zA.jpg',
    overview:
      "Peter Parker is an outcast high schooler abandoned by his parents as a boy, leaving him to be raised by his Uncle Ben and Aunt May. Like most teenagers, Peter is trying to figure out who he is and how he got to be the person he is today. As Peter discovers a mysterious briefcase that belonged to his father, he begins a quest to understand his parents' disappearance – leading him directly to Oscorp and the lab of Dr. Curt Connors, his father's former partner. As Spider-Man is set on a collision course with Connors' alter ego, The Lizard, Peter will make life-altering choices to use his powers and shape his destiny to become a hero.",
    popularity: 306.376,
  },
  {
    id: 92,
    title: 'Heart Shot',
    genre: ['Romance', 'Crime'],
    releaseDate: '2022-02-17',
    posterUrl: 'https://image.tmdb.org/t/p/original/ubaCN0FjWhxiu1uHhI9oXSgalVK.jpg',
    overview:
      "Teenagers Nikki and Sam are in love and planning their future together — until Nikki's dangerous past returns to threaten everything.",
    popularity: 302.272,
  },
  {
    id: 93,
    title: 'Avatar',
    genre: ['Action', 'Adventure', 'Fantasy', 'Science Fiction'],
    releaseDate: '2009-12-10',
    posterUrl: 'https://image.tmdb.org/t/p/original/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg',
    overview:
      'In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.',
    popularity: 297.357,
  },
  {
    id: 94,
    title: 'Mobile Suit Gundam Hathaway',
    genre: ['Animation', 'Action', 'Drama', 'Science Fiction'],
    releaseDate: '2021-06-11',
    posterUrl: 'https://image.tmdb.org/t/p/original/6gw8onh4FKsruBA7Oouv01EFxzn.jpg',
    overview:
      "After Char's rebellion, Hathaway Noa leads an insurgency against Earth Federation, but meeting an enemy officer and a mysterious woman alters his fate.",
    popularity: 292.604,
  },
  {
    id: 95,
    title: 'Army of Thieves',
    genre: ['Crime', 'Comedy'],
    releaseDate: '2021-10-27',
    posterUrl: 'https://image.tmdb.org/t/p/original/iPTZGFmPs7HsXHYxiuxGolihjOH.jpg',
    overview:
      'A mysterious woman recruits bank teller Ludwig Dieter to lead a group of aspiring thieves on a top-secret heist during the early stages of the zombie apocalypse.',
    popularity: 290.54,
  },
  {
    id: 96,
    title: 'UFO',
    genre: ['Drama', 'Romance'],
    releaseDate: '2022-02-23',
    posterUrl: 'https://image.tmdb.org/t/p/original/m7mNjsZKuLpBWYNGSTLmWKOYkvl.jpg',
    overview:
      'When aspiring musician and student Deniz falls for a rough-hewn motorbike racer, tragedy and family opposition obstruct their path to love.',
    popularity: 290.481,
  },
  {
    id: 97,
    title: 'The Weekend Away',
    genre: ['Thriller', 'Mystery'],
    releaseDate: '2022-03-03',
    posterUrl: 'https://image.tmdb.org/t/p/original/6MS0QEl7UK2gdFFbHfNwuYlsq4H.jpg',
    overview:
      "When her best friend vanishes during a girls' trip to Croatia, Beth races to figure out what happened. But each clue yields another unsettling deception.",
    popularity: 290.206,
  },
  {
    id: 98,
    title: 'The Croods: A New Age',
    genre: ['Animation', 'Family', 'Adventure', 'Fantasy', 'Comedy'],
    releaseDate: '2020-11-25',
    posterUrl: 'https://image.tmdb.org/t/p/original/tbVZ3Sq88dZaCANlUcewQuHQOaE.jpg',
    overview:
      "Searching for a safer habitat, the prehistoric Crood family discovers an idyllic, walled-in paradise that meets all of its needs. Unfortunately, they must also learn to live with the Bettermans -- a family that's a couple of steps above the Croods on the evolutionary ladder. As tensions between the new neighbors start to rise, a new threat soon propels both clans on an epic adventure that forces them to embrace their differences, draw strength from one another, and survive together.",
    popularity: 284.798,
  },
  {
    id: 99,
    title: 'Back to the Outback',
    genre: ['Animation', 'Family', 'Adventure', 'Comedy'],
    releaseDate: '2021-12-03',
    posterUrl: 'https://image.tmdb.org/t/p/original/zNXNRLH5wJprUG6B1olaBTNZOjy.jpg',
    overview:
      'Tired of being locked in a reptile house where humans gawk at them like they are monsters, a ragtag group of Australia’s deadliest creatures plot an escape from their zoo to the Outback, a place where they’ll fit in without being judged.',
    popularity: 282.246,
  },
  {
    id: 100,
    title: 'The Tomorrow War',
    genre: ['Action', 'Science Fiction', 'Adventure'],
    releaseDate: '2021-07-02',
    posterUrl: 'https://image.tmdb.org/t/p/original/34nDCQZwaEvsy4CFO5hkGRFDCVU.jpg',
    overview:
      'The world is stunned when a group of time travelers arrive from the year 2051 to deliver an urgent message: Thirty years in the future, mankind is losing a global war against a deadly alien species. The only hope for survival is for soldiers and civilians from the present to be transported to the future and join the fight. Among those recruited is high school teacher and family man Dan Forester. Determined to save the world for his young daughter, Dan teams up with a brilliant scientist and his estranged father in a desperate quest to rewrite the fate of the planet.',
    popularity: 282.068,
  },
];

const mockReviews = [
  {
    id: 1,
    movieId: 1, // Associated with Spider-Man: No Way Home
    authorId: 101, // Associated with Author 1
    rating: 5,
    comment: 'Great movie!',
  },
  {
    id: 2,
    movieId: 1, // Associated with Spider-Man: No Way Home
    authorId: 102, // Associated with Author 2
    rating: 4,
    comment: 'Awesome film!',
  },
  {
    id: 3,
    movieId: 2, // Associated with The Batman
    authorId: 101, // Associated with Author 1
    rating: 4,
    comment: 'Loved it!',
  },
  {
    id: 4,
    movieId: 2, // Associated with The Batman
    authorId: 103, // Associated with Author 3
    rating: 3,
    comment: 'Not bad!',
  }
];

const mockUsers = [
    {
        id: 101,
        email: 'a@a',
        profilePictureUrl: 'https://image.tmdb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'
    },
    {
        id: 102,
        email: 'b@b',
        profilePictureUrl: 'https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg'
    },
    {
        id: 103,
        email: 'c@c',
        profilePictureUrl: 'https://image.tmdb.org/t/p/original/vDHsLnOWKlPGmWs0kGfuhNF4w5l.jpg'
    },
    {
        id: 104,
        email: 'd@d',
        profilePictureUrl: 'https://image.tmdb.org/t/p/original/vDHsLnOWKlPGmWs0kGfuhNF4w5l.jpg'
    }];

const db = {
    movies: mockMovies,
    reviews: mockReviews,
    users: mockUsers
}

module.exports = {db};