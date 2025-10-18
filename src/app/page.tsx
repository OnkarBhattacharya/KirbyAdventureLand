import KirbyGame from '@/components/game/kirby-game';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center mb-6">
        <h1 className="text-5xl font-bold text-primary font-headline tracking-tight" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.1)'}}>
          Kirby's Adventure Land
        </h1>
        <p className="text-muted-foreground mt-2">A simple and fun game for kids!</p>
      </div>
      <KirbyGame />
    </main>
  );
}
