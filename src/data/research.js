export const research = {
  published: [
    {
      id: 'resgenxai-ieee',
      title: 'ResGenXAI: Explainable AI for Band Selection in Hyperspectral Imaging',
      venue: 'IEEE ResGenXAI 2025',
      year: '2025',
      type: 'Conference Paper',
      status: 'Published',
      statusColor: '#10B981',
      abstract:
      'Hyperspectral imaging (HSI) offers rich spectral information for accurate material classification, but its high dimensionality requires effective band selection to reduce redundancy while preserving discriminative power. We analyze band importance, feature interactions, and spectral relationships. Our findings consistently identify near-infrared bands as dominant contributors and reveal key trade-offs between optimization performance and interpretability, providing a transparent framework for practical HSI band selection.',      
      authors: [
        'Dhruv Mehta',
        'Amey Agarwal',
        'Vidhi Gajra',
        'Prof. Vaishnavee Rathod',
        'Prof. Aparna Halbe',
      ],
      doi: '10.1109/ResgenXAI64788.2025.11344040',
      link: 'https://ieeexplore.ieee.org/document/11344040',
      thumbnail: '/thumbnails/resgenxai.png',
      tags: ['XAI', 'Computer Vision', 'Deep Learning', 'ResNet', 'PyTorch'],
      highlights: [
        'Comparative evaluation of ACO, DCLRR, and CSCI for hyperspectral band selection on the Salinas-A dataset',
        'Systematic analysis of band importance, inter-band interactions, and spectral redundancy',
        'Sub-200ms explanation generation per image',
        'Demonstrated trade-offs between optimization performance and model interpretability',
        'Consistent identification of near-infrared (NIR) bands as dominant contributors to classification performance',
        'Provided an explainability-driven framework to guide practical HSI band selection in real-world applications'
      ],
    },
  ],

  contributions: [
    {
      id: 'iitb-csre',
      title:
        'Tree Crown Segmentation using Multi-Modal Deep Learning on Remote Sensing Data',
      venue: null,
      year: '2024',
      type: 'Research Contribution',
      status: 'Under Review',
      statusColor: '#F59E0B',
      abstract:
        'Developed a multi-modal deep learning segmentation pipeline for tree detection and segmentation using optical, multispectral, and LiDAR remote sensing imagery. Designed and fine-tuned U-Net and F-CNN architectures, improving pixel-level accuracy from ~67% baseline to 98%.',
      institution: 'CSRE Department, IIT Bombay',
      supervisor: 'Prof. Gulab Singh, IIT Bombay',
      tags: [
        'Geospatial AI',
        'Remote Sensing',
        'U-Net',
        'F-CNN',
        'TensorFlow',
        'Keras',
        'QGIS',
      ],
      highlights: [
        'Collected and annotated 140+ geospatial images (99% labeling accuracy)',
        'Implemented filtering, augmentation, and patchification pipelines',
        'Improved segmentation accuracy from 67% to 98%',
        'Contributed to forthcoming peer-reviewed publication',
      ],
      thumbnail: '/images/iitb-logo.svg',
    },
  ],

  interests: [
    {
      id: 'offline-rl',
      title: 'Offline Reinforcement Learning',
      description:
        'Studying batch-constrained and model-based offline RL algorithms for real-world deployment where interaction data is limited or expensive. Interested in stability, policy generalization, and safety in sequential decision making.',
      icon: '🎯',
      color: '#8B5CF6',
    },
    {
      id: 'llm-context',
      title: 'Context Generation & Exploration in LLMs',
      description:
        'Exploring how large language models generate, structure, and reason over context — including retrieval-augmented generation, dynamic memory mechanisms, and controlled exploration strategies for better reasoning.',
      icon: '🧠',
      color: '#00E5FF',
    },
    {
      id: 'generative-dl',
      title: 'Generative Models & Transformers',
      description:
        'Interested in GANs, diffusion models, transformers, and deep learning for computer vision and NLP — focusing on representation learning, generative modeling, and multimodal architectures.',
      icon: '⚡',
      color: '#10B981',
    },
  ],
}