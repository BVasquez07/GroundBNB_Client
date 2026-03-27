import { Component } from '@angular/core';
import {ImageFallbackDirective} from '../../directives/image-fallback';

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [ImageFallbackDirective],
  templateUrl: "./footer.html",
  styleUrl: "./footer.scss",
})
export class Footer {
  useCaseLinks = [
    "UI design",
    "UX design",
    "Wireframing",
    "Diagramming",
    "Brainstorming",
    "Online whiteboard",
    "Team collaboration",
  ];
  exploreLinks = [
    "Design",
    "Prototyping",
    "Development features",
    "Design systems",
    "Collaboration features",
    "Design process",
    "FigJam",
  ];
  resourceLinks = [
    "Blog",
    "Best practices",
    "Colors",
    "Color wheel",
    "Support",
    "Developers",
    "Resource library",
  ];
}
