import type { PropsWithChildren } from 'react';
import { Drawer } from 'vaul';

import type { Variant } from '../types';
import SelectionItem from './selection-item';

type BottomSheet = PropsWithChildren<{
	variant?: Variant;
}>;

export default function BottomSheet({ children, variant }: BottomSheet) {
	return (
		<Drawer.Root>
			<Drawer.Trigger className="w-full">
				{variant && <SelectionItem variant={variant} />}
			</Drawer.Trigger>
			<Drawer.Portal container={document.getElementById('root')}>
				<Drawer.Overlay className="absolute inset-0 bg-black/40" />
				<Drawer.Content className="bg-gray-100 h-fit absolute bottom-0 left-0 right-0 outline-none rounded-t-3xl">
					{children}
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}
