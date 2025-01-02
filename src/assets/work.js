const WORK = [
  {
    name: 'FLORA: Styles',
    images: ['loras.png'],
    description:
      '<p>FLORA is the ultimate orchestration layer to plug and play with all the latest AI models. </br> </br>I built styles into the product, allowing users to do style transfers on images using Flux LoRAs. This project involved creating a custom pipeline to load/unload Flux LoRAs on a Modal container along with creating UI components to select and upload LoRAs.</br> <br> Above showcases the styles "Tarot Card", "Victorian Drawing", "Watercolor", "Studio Ghibli", "Retrofuturism", "Pixar", and "Pixel". </br></p>',
    stack: 'React • JavaScript • HTML/CSS • Modal • Python',
    summary:
      'FLORA is an infinite AI canvas - I made their landing page and am working as a backend engineer',
    date: '04.2024',
    link: 'https://florafauna.ai',
  },
  {
    name: 'FLORA: Mobile',
    images: ['landing.gif', 'loading.gif', 'minecraft.gif'],
    description:
      '<p> I took lead on developing FLORA\'s mobile landing page which features a realtime AI filter where users can transform their face by typing their own prompts. This is done through a Stream Diffusion pipeline hosted on a Modal container in the backend.</p>',
    stack: 'React • JavaScript • HTML/CSS • PostgreSQL • Modal • Python',
    summary:
      'FLORA is an infinite AI canvas - I made their landing page and am working as a backend engineer',
    date: '04.2024',
    link: 'https://florafauna.ai',
  },
  {
    name: 'CAD Autolabeling',
    images: ['captionable-canny.png'],
    description:
      '<p>At Autodesk Research, I developed autolabeling technology for CAD files uploaded to the Autodesk Viewer platform. </br> </br> I learned how to host pre-trained language models (BLIP, BLIP-2, CLIP) using Salesforce Lavis and design experimentation pipelines to finetune them on company data using PyTorch manipulation and LoRA configs. Additionally, I worked with PyTorch DDP to run multiple model replicas in parallel for rapid caption generation.</p>',
    stack: 'Python • PyTorch • BLIP-2 • CLIP • LoRA finetuning • pandas',
    summary:
      'Autolabeling technology for CAD files uploaded to the Autodesk Viewer.',
    date: '04.2024',
    link: 'https://medium.com/@shridharathi/employing-pretrained-vision-and-language-models-to-auto-label-cad-files-d872cad2299a/',
  },
  {
    name: 'Room Genius',
    images: ['room_genius.png'],
    description:
      '<p>AI Interior Design app which also finds products on Amazon. 30k+ users, 2k+ MRR.</p>',
    stack: 'React • PostgreSQL • Supabase • Stripe • Figma',
    summary:
      'AI Interior Design app which also finds products on Amazon. 30k+ users, 2k+ MRR.',
    date: '06.2024',
    link: 'tryroomgenius.com',
  },
  {
    name: 'Vibeify',
    images: ['vibeify.png'],
    description:
      '<p>Vibeify is a web application that converts an image or text into a customized playlist. </br></br> The user is prompted to submit an image or text which is passed through GPT-4-vision to output a list of related songs. These songs are then found through Spotify search and put into a playlist on the user\'s Spotify account. This project was an exploration of commodifing GPT-4 vision into an accessible, fun product to showcase AI\'s capability of creative content. </br></br>This webapp uses a FastAPI backend deployed on Heroku and React frontend deployed with Netlify.</p>',
    stack: 'React • FastAPI • Spotify API • OpenAI API',
    summary:
      'Vibeify is a web application that converts an image or text into a customized playlist. ',
    date: '04.2024',
    link: 'https://github.com/shridharathi/vibeify',
  },

  {
    name: 'URL Chatbot',
    images: ['url.png'],
    description:
      '<p>Chat/query on text from any URL you want to upload. </br></br> This webapp was an exploration in self-implementing Retrival Augmented Generation (RAG) technology. The backend scrapes the text in the URL, chunks the text, embeds the chunks using OpenAI embeddings, and stores the embeddings in Pinecone. Then, the user can query about content in the webpage; this query is constructed into a prompt for GPT-4, and a similarity search is conducted within the Pinecone database to retreive the most relevant information/answer. </p>',
    stack: 'Streamlit • FastAPI • Pinecone • OpenAI',
    summary:
      'Chat/query on text from any URL you want to upload',
    date: '01.2024',
    link: 'https://github.com/shridharathi/rag-llm-chatbot',
  },

  {
    name: 'Art Classifier',
    images: ['art.png'],
    description:
      '<p>Historical art classification serves as an engaging topic within the digital humanities given the vast, rich visual and textual data involved. Most research has classified art pieces by artist and style, but there is little to no prior work on classification by medium. We utilize various Convolutional Neural Network (CNN) architectures (mostly variations of ResNet) as platforms for experimentation to ultimately develop and fine-tune a high performing medium classification paradigm. Using data from Tate collection involving British artwork from 1500 to the present and models ranging from a rudimentary CNN to ResNet18 paired with data augmentation and frozen gradients, our strongest model obtained an overall test accuracy of 74.9%. We also showcase interesting discussion on binary classification through medium tagging. Ultimately, these results showcase the power of CNNs in medium classification, signifying their abilities of learning representational characteristics of various media</p>',
    stack: 'Python • Pytorch • numpy • scikit-learn • ResNet18',
    summary:
      'Historical art classification',
    date: '04.2022',
    link: 'https://cs231n.stanford.edu/reports/2022/pdfs/135.pdf',
  },

  {
    name: 'Screenplay Generator',
    images: ['screenplay.png'],
    stack: "Python • BeautifulSoup • LSTM • DistilGPT-2",
    description:
      "<p>This project was a capstone for CS224N - NLP with Deep Learning (2022) </br></br> Our primary motivating question was to determine how do various NLP model architectures compare when tasked to generate a movie screenplay in the artistic style of both a user-inputted genre and movie director. Previous work in long text generation exists, but we built various models on a novel application of having multiple user-inputted stylistic dimensions to control in generative text. We compared various models and approaches, particularly OpenAI’s GPT-2 language model along with the DistilGPT-2 model (this research was conducted in 2022), ultimately finding DistilGPT-2 under 10 epochs yielded the best screenplay generation. We compared model performances against a baseline LSTM architecture. </p>",
    summary:
      "Movie Screenplay Generator given genre and author name",
    date: '04.2022',
    link: 'https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1224/reports/custom_116978375.pdf',
  },
  {
    name: 'Pune Water Distribution',
    images: ['pune.png', 'pune2.png'],
    stack: 'Python • pandas • OpenCV • ArcGIS • Illustrator API',
    description:
      "<p>No major city in India has a 24x7 piped water supply system. Pune in Maharashtra, India has plans to be among the first, and yet, it faces a mismatch between available piped water supply and demand for potable water. In this modeling study, we investigate the degree to which Pune’s current intermittent water supply system (IWS) contributes to this. Over 94% of Pune homes are serviced, yet approximately 30-40% of water is lost to leakage and mismanagement under the IWS. This study compares a 24x7 water distribution system (WDS) with an intermittent system to quantify the gains in water supply and changes in equity among different urban users from high-income households to slum-dwellings. Using data supplied by the Pune Municipal Corporation, a hydraulic model of the current WDS was digitized with the Water Network Tool for Resilience (WNTR). EPAnet engine simulations were conducted and alterations to the existing IWS were made to transform the system to a 24x7 water supply model. Our results have implications for water resources planning, management, and climate resiliency as they reveal the tradeoffs and advantages of each type of water distribution system. Quantifying the potential benefits helps municipalities in Pune as they weigh costs of investing in continuous water supply against the inequities which characterize intermittency.</p>",
    summary:
      'Modeling study on water distribution in Pune, India.',
    date: '04.2020',
    link: 'https://agu.confex.com/agu/fm20/meetingapp.cgi/Paper/735906',
  },
  {
    name: 'Protein Folding',
    images: ['protein.png', 'protein2.png'],
    stack: 'Python • matplotlib • PyMol • OOP',
    description:
      "<p>The problem of protein structure prediction is defined simply: given the amino acid sequence of a protein, how can we predict its 3D structure? </br> </br>Although studies of proteins are rooted in biology and should always remain studied in a biological context, it is interesting to look at these structures through the lens of physics. A surprisingly popular model of polymers in general is the bead-spring model. This model treats atoms as beads and the distance between each adjacent atom as a massless harmonic spring. Using this model, I wanted to investigate the effect of using spring potential energy in the function of the Monte-Carlo Metropolis criterion. I implemented this in Python. </p>",
    summary:
      "Protein Structure Prediction",
    date: '04.2020',
    link: 'https://github.com/shridharathi/protein_folder',
  }
];

export default WORK;