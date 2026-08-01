import React from 'react';
import { Hero } from './Hero';
import { AboutSection } from './AboutSection';
import { ReliabilitySection } from './ReliabilitySection';
import { StatsBar } from './StatsBar';
import { ProductCatalogPreview } from './ProductCatalogPreview';
import { ServicesSection } from './ServicesSection';
import { IndustriesSection } from './IndustriesSection';
import { ProcessTimeline } from './ProcessTimeline';
import { FeaturedProduct } from './FeaturedProduct';
import { Gallery } from './Gallery';
import { Testimonials } from './Testimonials';
import { FAQAccordion } from './FAQAccordion';
import { ContactSection } from './ContactSection';
import { Product, RFQFormData } from '../../types';

interface HomePageProps {
  onSelectProduct: (product: Product) => void;
  onOpenRFQ?: (prefilledCategory?: string) => void;
  onSubmitRFQ: (data: RFQFormData) => void;
  onDownloadSpec: (productName: string) => void;
  onExploreCatalog: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectProduct,
  onOpenRFQ,
  onSubmitRFQ,
  onDownloadSpec,
  onExploreCatalog
}) => {
  return (
    <main className="overflow-hidden">
      {/* 1. Hero */}
      <Hero onOpenRFQ={onOpenRFQ ? () => onOpenRFQ() : undefined} onExploreCatalog={onExploreCatalog} />

      {/* 2. About Section */}
      <AboutSection />

      {/* 3. Engineered for Reliability & Scale */}
      <ReliabilitySection />

      {/* 4. Stats Bar */}
      <StatsBar />

      {/* 5. Product Catalog Preview */}
      <ProductCatalogPreview
        onSelectProduct={onSelectProduct}
        onOpenRFQ={onOpenRFQ ? (name) => onOpenRFQ(name) : undefined}
      />

      {/* 6. Services Section */}
      <ServicesSection onOpenRFQ={onOpenRFQ ? (servTitle) => onOpenRFQ(servTitle) : undefined} />

      {/* 7. Industries Served */}
      <IndustriesSection />

      {/* 8. Order Process */}
      <ProcessTimeline />

      {/* 9. Featured Product Highlight */}
      <FeaturedProduct
        onOpenRFQ={onOpenRFQ ? (prodName) => onOpenRFQ(prodName) : undefined}
        onDownloadSpec={onDownloadSpec}
      />

      {/* 10. Industrial Gallery */}
      <Gallery />

      {/* 11. Testimonials */}
      <Testimonials />

      {/* 12. FAQ */}
      <FAQAccordion />

      {/* 13. Contact / RFQ Section */}
      <ContactSection onSubmitRFQ={onSubmitRFQ} />
    </main>
  );
};
