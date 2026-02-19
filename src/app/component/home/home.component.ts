import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

interface Citation {
  id: number;
  content: string;
  target: string | null;
  author_name: string;
  created_at: string;
  reactions: Record<string, number>;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface RoadmapStep {
  version: string;
  status: string;
  date: string;
  changes: string[];
}

interface Roadmap {
  logo: string;
  title: string;
  comingSoon: string;
  color: string;
  status: string;
  colorStatus: string;
  steps: RoadmapStep[];
}

interface RoadmapEntry extends Roadmap {
  key: string;
  latestVersion?: string;
  textColorClass: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {
  citations: Citation[] = [];
  carouselCitations: Citation[] = [];
  faqItems: FaqItem[] = [];
  roadmaps: RoadmapEntry[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    forkJoin({
      citations: this.http.get<Citation[]>('data/demoCitations.json'),
      faq: this.http.get<FaqItem[]>('data/faq.json'),
      roadmaps: this.http.get<Record<string, Roadmap>>('data/appsVersions.json')
    }).subscribe({
      next: ({ citations, faq, roadmaps }) => {
        this.citations = citations ?? [];
        this.carouselCitations = [...this.citations].reverse();
        this.faqItems = (faq ?? []).slice(-3);
        this.roadmaps = this.mapRoadmaps(roadmaps ?? {});
        setTimeout(() => window.dispatchEvent(new Event('home:refresh')));
      },
      error: (error) => {
        console.error('Failed to load home data', error);
      }
    });
  }

  ngAfterViewInit(): void {
    window.dispatchEvent(new Event('typewriter:refresh'));
    window.dispatchEvent(new Event('home:refresh'));
  }

  private mapRoadmaps(roadmaps: Record<string, Roadmap>): RoadmapEntry[] {
    return Object.entries(roadmaps).map(([key, value]) => {
      const latestCompleted = (value.steps ?? []).filter((step) => step.status === 'true').slice(-1)[0];
      return {
        key,
        ...value,
        latestVersion: latestCompleted?.version,
        textColorClass: this.getTextColorClass(value.color)
      };
    });
  }

  private getTextColorClass(color: string): string {
    if (!color) {
      return 'text-[var(--primary-color)]';
    }
    if (color.startsWith('[')) {
      return `text-${color}`;
    }
    return `text-${color}`;
  }
}