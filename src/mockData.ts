import { VideoData } from './types';

export const mockVideoData: VideoData = {
  id: 'vid-001',
  title: 'Understanding the nuances of asynchronous programming in modern JavaScript.',
  description: 'Mastering Tech Vocabulary: Episode 04',
  url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', // Placeholder video
  subtitles: [
    {
      id: 'sub-1',
      startTime: 0,
      endTime: 5,
      en: 'Today we are going to explore why efficiency matters in large scale applications.',
      zh: '今天我们将探讨为什么在大规模应用中效率至关重要。',
      vocab: [
        { word: 'efficiency', level: 'junior', translation: '效率', example: 'We need to improve the efficiency of our code.', phonetic: '/ɪˈfɪʃnsi/' }
      ]
    },
    {
      id: 'sub-2',
      startTime: 5.1,
      endTime: 10,
      en: 'Understanding the nuances of asynchronous programming in modern JavaScript.',
      zh: '理解现代 JavaScript 中异步编程的细微差别。',
      vocab: [
        { word: 'nuances', level: 'abroad', translation: '细微差别', example: 'The nuances of the language are hard to grasp.', phonetic: '/ˈnjuːɑːnsɪz/' },
        { word: 'asynchronous', level: 'abroad', translation: '异步的', example: 'Asynchronous programming allows non-blocking operations.', phonetic: '/eɪˈsɪŋkrənəs/' }
      ]
    },
    {
      id: 'sub-3',
      startTime: 10.1,
      endTime: 15,
      en: 'Most developers struggle with concurrency when they first start.',
      zh: '大多数开发人员在刚开始时都会在并发性方面遇到困难。',
      vocab: [
        { word: 'concurrency', level: 'high', translation: '并发性', example: 'Concurrency is a complex topic in computer science.', phonetic: '/kənˈkʌrənsi/' }
      ]
    },
    {
      id: 'sub-4',
      startTime: 15.1,
      endTime: 20,
      en: 'The event loop is the core mechanism that handles these tasks.',
      zh: '事件循环是处理这些任务的核心机制。',
      vocab: [
        { word: 'mechanism', level: 'cet4', translation: '机制', example: 'The mechanism of action is still unknown.', phonetic: '/ˈmekənɪzəm/' }
      ]
    },
    {
      id: 'sub-5',
      startTime: 20.1,
      endTime: 25,
      en: 'Let\'s look at a concrete implementation to see how this works.',
      zh: '让我们看一个具体的实现来了解它是如何工作的。',
      vocab: [
        { word: 'implementation', level: 'junior', translation: '实现', example: 'The implementation of the new feature is complete.', phonetic: '/ˌɪmplɪmenˈteɪʃn/' }
      ]
    }
  ]
};
