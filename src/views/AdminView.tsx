import React, { useState, useRef } from 'react';
import { Language, i18n } from '../i18n';
import { UploadCloud, FileText, CheckCircle, Trash2, Film } from 'lucide-react';

interface AdminViewProps {
  lang: Language;
}

export function AdminView({ lang }: AdminViewProps) {
  const t = i18n[lang];
  const [videoStatus, setVideoStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [subStatus, setSubStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [videoFileName, setVideoFileName] = useState<string>('');
  const [subFileName, setSubFileName] = useState<string>('');

  const [uploadedVideos, setUploadedVideos] = useState([
    { id: '1', title: 'Introduction to React', date: '2023-10-20', size: '24.5 MB' },
    { id: '2', title: 'Advanced English Vocabulary', date: '2023-10-22', size: '18.2 MB' },
    { id: '3', title: 'Daily Conversation Practice', date: '2023-10-25', size: '32.1 MB' },
  ]);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const subInputRef = useRef<HTMLInputElement>(null);

  const handleDeleteVideo = (id: string) => {
    setUploadedVideos(prev => prev.filter(v => v.id !== id));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'video' | 'sub') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'video') {
      setVideoFileName(file.name);
      setVideoStatus('uploading');
      setTimeout(() => {
        setVideoStatus('success');
      }, 2000);
    } else {
      setSubFileName(file.name);
      setSubStatus('uploading');
      setTimeout(() => {
        setSubStatus('success');
      }, 2000);
    }
  };

  const triggerVideoSelect = () => {
    if (videoStatus === 'idle') {
      videoInputRef.current?.click();
    }
  };

  const triggerSubSelect = () => {
    if (subStatus === 'idle' && videoStatus === 'success') {
      subInputRef.current?.click();
    }
  };

  return (
    <main className="pt-24 pb-12 px-8 max-w-screen-xl mx-auto min-h-screen">
      <header className="mb-12">
        <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface">{t.adminPanel}</h2>
        <p className="font-body text-outline mt-2 text-lg">Upload, subtitle, and track your educational content.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Video Upload Zone */}
        <section className="bg-surface-container-low rounded-xl p-8 transition-all hover:bg-surface-container">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <UploadCloud className="w-6 h-6" />
            </div>
            <h3 className="font-headline text-xl font-bold">1. {t.uploadVideo}</h3>
          </div>
          
          <div 
            onClick={triggerVideoSelect}
            className="border-2 border-dashed border-outline-variant rounded-xl bg-surface-container-lowest flex flex-col items-center justify-center py-20 px-6 text-center group cursor-pointer hover:border-primary transition-colors"
          >
            <input 
              type="file" 
              ref={videoInputRef} 
              className="hidden" 
              accept="video/mp4,video/quicktime,video/webm"
              onChange={(e) => handleFileSelect(e, 'video')}
            />
            {videoStatus === 'idle' && (
              <>
                <div className="w-16 h-16 bg-primary-fixed rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="text-primary w-8 h-8" />
                </div>
                <p className="font-body text-on-surface font-semibold mb-1">{t.dragDrop}</p>
                <p className="font-body text-sm text-outline">MP4, MOV, or WebM up to 2GB</p>
                <button className="mt-6 px-6 py-2 bg-surface-container-high text-on-surface-variant font-medium rounded-lg hover:bg-surface-dim transition-colors">
                  {t.browseFiles}
                </button>
              </>
            )}
            {videoStatus === 'uploading' && (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="font-bold text-primary">{t.uploading}</p>
                <p className="text-sm text-outline mt-2">{videoFileName}</p>
              </div>
            )}
            {videoStatus === 'success' && (
              <div className="flex flex-col items-center text-secondary">
                <CheckCircle className="w-16 h-16 mb-4" />
                <p className="font-bold">{t.uploadSuccess}</p>
                <p className="text-sm text-outline mt-2">{videoFileName}</p>
              </div>
            )}
          </div>
        </section>

        {/* Subtitle Upload Zone */}
        <section className="bg-surface-container-low rounded-xl p-8 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-tertiary/10 rounded-lg text-tertiary">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-headline text-xl font-bold">2. {t.uploadSubtitles}</h3>
          </div>
          
          <div 
            onClick={triggerSubSelect}
            className={`border-2 border-dashed border-outline-variant rounded-xl bg-surface-container-lowest flex flex-col items-center justify-center py-20 px-6 text-center group transition-colors ${videoStatus === 'success' ? 'cursor-pointer hover:border-primary' : 'opacity-50 cursor-not-allowed'}`}
          >
            <input 
              type="file" 
              ref={subInputRef} 
              className="hidden" 
              accept=".srt,.vtt"
              onChange={(e) => handleFileSelect(e, 'sub')}
            />
            {subStatus === 'idle' && (
              <>
                <div className="w-16 h-16 bg-tertiary-fixed rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="text-tertiary w-8 h-8" />
                </div>
                <p className="font-body text-on-surface font-semibold mb-1">{t.dragDrop}</p>
                <p className="font-body text-sm text-outline">SRT or VTT format</p>
                <button 
                  disabled={videoStatus !== 'success'}
                  className="mt-6 px-6 py-2 bg-surface-container-high text-on-surface-variant font-medium rounded-lg hover:bg-surface-dim transition-colors disabled:opacity-50"
                >
                  {t.browseFiles}
                </button>
              </>
            )}
            {subStatus === 'uploading' && (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-tertiary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="font-bold text-tertiary">{t.uploading}</p>
                <p className="text-sm text-outline mt-2">{subFileName}</p>
              </div>
            )}
            {subStatus === 'success' && (
              <div className="flex flex-col items-center text-secondary">
                <CheckCircle className="w-16 h-16 mb-4" />
                <p className="font-bold">{t.uploadSuccess}</p>
                <p className="text-sm text-outline mt-2">{subFileName}</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Video Management Section */}
      <section className="bg-surface-container-low rounded-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
            <Film className="w-6 h-6" />
          </div>
          <h3 className="font-headline text-xl font-bold">3. {t.videoManagement}</h3>
        </div>

        {uploadedVideos.length === 0 ? (
          <div className="text-center py-12 text-outline bg-surface-container-lowest rounded-xl border border-outline-variant/30">
            {t.noVideos}
          </div>
        ) : (
          <div className="overflow-x-auto bg-surface-container-lowest rounded-xl border border-outline-variant/30">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/30 text-outline text-sm bg-surface-container-low/50">
                  <th className="py-4 px-6 font-medium">{t.videoTitle}</th>
                  <th className="py-4 px-6 font-medium">{t.uploadDate}</th>
                  <th className="py-4 px-6 font-medium">{t.size}</th>
                  <th className="py-4 px-6 font-medium text-right">{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {uploadedVideos.map(video => (
                  <tr key={video.id} className="border-b border-outline-variant/20 hover:bg-surface-container-low transition-colors last:border-0">
                    <td className="py-4 px-6 font-medium text-on-surface">{video.title}</td>
                    <td className="py-4 px-6 text-outline text-sm">{video.date}</td>
                    <td className="py-4 px-6 text-outline text-sm">{video.size}</td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => handleDeleteVideo(video.id)}
                        className="p-2 text-error hover:bg-error-container rounded-lg transition-colors inline-flex items-center justify-center"
                        title={t.delete}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
