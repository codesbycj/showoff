import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

// STEP 1.01 the header
// import { AppBar } from '@/features/crmnet/components/app-bar';
// STEP 1.08 the customers
// import { CustomerGrid } from '@/features/crmnet/components/customer-grid';
// STEP 1.05 how to narrow it
// import { FilterRow } from '@/features/crmnet/components/filter-row';
// STEP 1.16 three things to do to the list
// import { FloatBar } from '@/features/crmnet/components/float-bar';
import { filters, header } from '@/features/crmnet/data/network';
import {
  BAR_BOTTOM,
  BAR_HEIGHT,
  FILTERS_TOP,
  GRID_TOP,
  HEADER_TOP,
  MARGIN,
} from '@/features/crmnet/layout';
import { cn } from '@/features/crmnet/theme';
import { useInsets } from '@/features/crmnet/use-insets';

/**
 * A sales CRM — the customer network.
 *
 * Assembly only: a header, the filters, the customers, and a bar floating over
 * them.
 *
 * The filter row is the one block that escapes the page margin: its last pill
 * is cut by the right-hand edge in the reference, which only a scroll does.
 *
 * The one piece of state is which filter is live, and it lives here rather
 * than in the row: the row is what changes it, but what it changes is the grid
 * below.
 *
 * Every handler is empty on purpose. The other two screens of this design are
 * their own showcases with their own slugs, so there is nothing to push to
 * yet; what matters is that the decision is made here.
 */
export default function CrmNet() {
  const insets = useInsets();
  const [filter, setFilter] = useState<string>(filters[0]);

  return (
    <View style={{ flex: 1, backgroundColor: cn.canvas }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + HEADER_TOP,
          paddingBottom: BAR_HEIGHT + BAR_BOTTOM + insets.bottom + 12,
        }}
      >
        <View style={{ paddingHorizontal: MARGIN }}>
          {/* STEP 1.02 across the top
          <AppBar one={header.one} two={header.two} />
          */}
        </View>

        {/* STEP 1.06 under the header
        <View style={{ marginTop: FILTERS_TOP }}>
          <FilterRow items={filters} active={filter} onSelect={setFilter} />
        </View>
        */}

        {/* STEP 1.09 two to a row
        <View style={{ marginTop: GRID_TOP, paddingHorizontal: MARGIN }}>
          <CustomerGrid />
        </View>
        */}
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: insets.bottom + BAR_BOTTOM,
          alignItems: 'center',
        }}
        pointerEvents="box-none"
      >
        {/* STEP 1.17 floating over it
        <FloatBar />
        */}
      </View>
    </View>
  );
}
