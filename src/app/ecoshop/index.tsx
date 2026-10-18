import { StatusBar } from 'expo-status-bar';
import Bell from 'lucide-react-native/icons/bell';
import ListFilter from 'lucide-react-native/icons/list-filter';
import Search from 'lucide-react-native/icons/search';
import { Pressable, ScrollView, View } from 'react-native';

import { FilterRow } from '@/features/ecoshop/components/filter-row';
import { ProductCard } from '@/features/ecoshop/components/product-card';
import { T } from '@/features/ecoshop/components/text';
import { header, products, section } from '@/features/ecoshop/data/shop';
import {
  BODY_TOP,
  CARD_GAP,
  CARD_TOP,
  FILTER_TOP,
  HEADER_DISC,
  HEADER_TOP,
  MARGIN,
  SECTION_TOP,
  TITLE_TOP,
} from '@/features/ecoshop/layout';
import { ec, radius } from '@/features/ecoshop/theme';
import { useInsets } from '@/features/ecoshop/use-insets';

/**
 * Eco Bites — the shop.
 *
 * Assembly only: the controls, what the shop sells, how to narrow it, and the
 * products themselves.
 *
 * The accent half of the title is a nested `T` rather than a second line, so
 * "Health" stays on the same baseline as the words before it however the line
 * breaks at another width.
 */
export default function EcoShop() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: ec.canvas }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + HEADER_TOP,
          paddingBottom: insets.bottom + 16,
          paddingHorizontal: MARGIN,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable accessibilityRole="button" accessibilityLabel="Filters">
            <ListFilter size={22} color={ec.ink} strokeWidth={2} />
          </Pressable>
          <View style={{ flex: 1 }} />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Disc label="Search">
              <Search size={18} color={ec.ink} strokeWidth={1.9} />
            </Disc>
            <Disc label="Alerts">
              <Bell size={18} color={ec.ink} strokeWidth={1.9} />
            </Disc>
          </View>
        </View>

        <View style={{ marginTop: TITLE_TOP }}>
          <T variant="display" color={ec.ink}>
            {header.titleLead}
            <T variant="display" color={ec.lime}>
              {header.titleAccent}
            </T>
          </T>
          <T variant="body" color={ec.muted} style={{ marginTop: BODY_TOP }}>
            {header.body}
          </T>
        </View>

        <View style={{ marginTop: FILTER_TOP }}>
          <FilterRow />
        </View>

        <View
          style={{
            marginTop: SECTION_TOP,
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-between',
          }}
        >
          <T variant="section" color={ec.ink}>
            {section.title}
          </T>
          <Pressable accessibilityRole="button" accessibilityLabel={section.more}>
            <T variant="more" color={ec.muted}>
              {section.more}
            </T>
          </Pressable>
        </View>

        <View style={{ marginTop: CARD_TOP, gap: CARD_GAP }}>
          {products.map((p) => (
            <ProductCard key={p.key} product={p} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

/** A round control in the top row. */
function Disc({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label}>
      <View
        style={{
          width: HEADER_DISC,
          height: HEADER_DISC,
          borderRadius: radius.full,
          backgroundColor: ec.well,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </View>
    </Pressable>
  );
}
